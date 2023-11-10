---
layout: post
title:  "Language Detection - Tips and Tricks"
date:   2022-12-21 10:00:00 +0100
description: "In the last 5 years Ultimate has grown from a monolingual Finnish solution to a multilingual 
              provider of AI for customer support. While multilingual bots can understand visitor messages 
              in many languages, the bots also need to answer in the visitor's language and although there are 
              many ready-to-use solutions in the market, we realized that none of them fit our use case.
              Therefore we have developed our own Language Detection Model and in this blog, I’ll present our 
              journey to creating the most accurate model in the field."
categories: podcast leadership decision-making
preview_image: /assets/img/posts/language-detection.png
author: "András Beke"
---

##What Is Language Detection?

Language detection is the task of automatically detecting the language(s) present in a document based on the content of 
the document. Computational approaches to this problem view it as a special case of text categorization, solved with 
various statistical methods. In the following table, there are some examples of language and text pairs.

Language detection is not the hardest task in NLP as language can be detected correctly over 99% of the time for 
well-written long texts. However, language detection in chat can be quite difficult. One of the most important problems 
is the short text, which contains one or a few words. To have good results on short text is crucial since the most 
common situation in a conversational chat bot is short interactions between the bot and the user. The multilingual 
text is challenging for language detection as well, where the user mixes more than one language when chatting with the bot. 
Another difficulty is distinguishing between closely related languages such as Spanish and Catalan, Serbian and Croatian.

##What do we need in a language detection model?

For selecting the best language detection method for us we have to take into account the following 
requirements:

* The language model should cover all the languages that our product can handle (109 languages).
* The model should be very accurate even if the message contains only one or two words.
* The model should have a low size to reduce its cost of it as much as possible.
* The model should be real-time. This is very important to avoid having a bottleneck in the chat flow.

##Reviewing existing tools

Language Detection has been extensively studied in the literature. At the very beginning, 
all of the research has been done on long, well-written and clean sentences, and 
paragraphs of text, therefore the results were quite impressive. During the past decades, 
the usage of text messages and social media platforms has exponentially increased. 
NLP tasks on social media text are very hard tasks because the text is very short, and 
contains a lot of different challenges such as slang, misspelled words, acronyms, etc. 
Of course, the performance of Language Detection performance drastically drops on chat 
and social media platforms' text.

There are several Language Detection tools available in the market. We collected them 
into a table and reviewed them from their applicability: accuracy, speed, number of 
supported languages, and environmental requirements.

| Tool name  | Cost     | Hosting   | Languages     | General Accuracy  | Accuracy on short text | Speed (10k text/s)   |
|------------|----------|-----------|---------------|-------------------|------------------------|----------------------|
| [Lingua](https://github.com/pemistahl/lingua-py) | Free | Local | 75 | High | High | Very slow |
| [No language left behind](https://arxiv.org/pdf/2207.04672.pdf) (fastText model) | Free | Local | 200 | Medium | Medium | Very slow |
| [Franc](https://github.com/wooorm/franc) | Free | Local | [82](https://github.com/wooorm/franc/tree/main/packages/franc-min), [187](https://github.com/wooorm/franc/tree/main/packages/franc) or [403](https://github.com/wooorm/franc/tree/main/packages/franc-all) languages | Medium | Recommended to be used only with long texts | Very slow |
| [Google API](https://cloud.google.com/translate) | Not Free | API | 100+ | Very accurate | Very accurate | Fast |
| [Langdetect](https://pypi.org/project/langdetect/) | Free | Local | 49 | Low | Low | Very slow |
| [Langid](https://pypi.org/project/langid/) | Free | Local | 97 | Low | Low | Slow |
| [pycld2](https://pypi.org/project/pycld2/) | Free | Local | 80 | Medium | Low | Very fast |
| [gcld3](https://pypi.org/project/gcld3/) | Free | Local | 107 | Medium | Low | Slow |
| [fastText](https://pypi.org/project/fasttext/) - [lid.176.bin](https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.bin) | Free | Local | 176 | Good | Low | Fast |
| [fastText](https://pypi.org/project/fasttext/) - [lid.176.ftz](https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.ftz) | Free | Local | 176 | Good | Low | Fast |
{: .table .table-responsive}

There are a lot of other Language Detection APIs that can be purchased. We aren’t listing them here because their performance is unknown. 

Based on the review, we concluded that there is no ready-to-use solution for us. None 
of them can work on short texts with high speed and good quality for multiple languages. 
Therefore we decided to build a Language Detection model in-house.

##Why is Language Detection so Difficult in Chat?

Before designing the Language Detection model, we identified the key problems of general 
Language Detection tools: why their performance is so bad on chat messages. The first 
and most trivial problem is that the message is very short - strings composed of a few 
characters are often present in more than one language, making reliable identification 
challenging.

> "api" -  This is an Indonesian word with meaning "fire", but also an English abbreviation 
> for "application programming interface".

Most of the time in chat users are typing a message like a query instead writing 
complete sentences:

> "I can not login to my account" → "Login issue"

In addition, most of the short messages are greetings. Greeting cause a huge problem 
for the Language Detection model, especially since a lot of users use English, Italian 
or Spanish greetings even if they would like to chat in a different language for example 
in German.

> "hi", "hello", "ciao", "hola", "bonjour", etc.

The second major problem is the domain mismatch. Most of the Language Detection tools 
were trained on Wikipedia (Wikipedia, [Tatoeba](https://huggingface.co/datasets/tatoeba), 
[Wili-2018](https://arxiv.org/pdf/1801.07779.pdf)). Wikipedia is well-written, with 
complete sentences, and has a very general vocabulary. It is easy to see, that the chat 
domain is the opposite of Wikipedia. The customer support domain has a very specific 
vocabulary with special technical terms, and the word usage also could be different. 

> There aren’t too many examples on Wikipedia for "login problem", "reset password", "delivery issues", etc.

In addition, chat messages contain noise such as typos, abbreviations, non-standard 
words, false starts, repetitions, missing punctuations, missing letter case information, 
pause filling words such as "um” and "uh”. Noise leads to confusion in text messages 
and the Language Detection model.

> "knsultant”, "cumschimbparolainoptimal", "want deliveri", "cn i get ma ordr statos", "hey wan raise ccredit llimit"

The third problem is that most Language Detection models have a huge bias toward 
English or other European languages. That means that model prefers English over other 
languages. The bias comes from the training data structure where the English examples 
are overrepresented. For example, the fastText model has an enormous bias towards English.

> fasttext prediction on "9999999" is English with 0.357 confidence.

The fourth problem is that Language Detection models are not well-calibrated. 
The calibration tells us whether should or shouldn’t trust our model prediction. 
All of the models produce some kind of confidence score during prediction which 
shows how the model is certain about the predicted language. The problem comes when 
the model is always very confident about the prediction even if the prediction is a 
mistake. We should have a model that we can trust.

When a model is well-calibrated, the confidence score should equal the accuracy. 
For example, if your test set has 100 examples for which the model predicts 0.8, the 
accuracy over those 100 examples should be 80%. In other words, if 0.8 is a true 
probability, the model should get 20% of these examples wrong! For all the examples 
with a confidence score of 0.9, the accuracy should be 90%, and so on.

##Our Journey: Design Tips and Tricks

###1 Choose Classifier Model

