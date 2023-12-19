---
layout: post
title:  "Large Language Models and Generative AI"
date:   2023-12-12
description: "Summary to be here!"
categories: llm genai ai
preview_image: /assets/img/posts/language-detection.png
author: "Meysam Asgari-Chenaghlu"
---

# Large Language Models: A gentle introduction

In recent years, a proliferation of new terminology and buzzwords has emerged, including GenAI, LLM, Prompt Engineering, 
and others. However, an elucidation of the precise meanings behind these buzzwords is warranted. Commencing with GenAI, 
it denotes a distinct category of Artificial Intelligence models capable of generating outputs across various modalities, 
encompassing text, image, video, and more.

## What is a Large Model?

A large model is typically a model trained on vast amounts of data and it has billions of parameters. Model parameters are trainable
variables (model weights) that are adjusted during training. In order to tune these weights in a way that a certain mathematical
operation over them would result in specific output, required lots of computation power and examples to show to this models.
Usually these models make a prediction such as completing a sentence given a part of it, and then look back at the correct
sentence part and tune their parameters to create correct output. This iteration takes place for many rounds and on many samples
combined together to provide accurate results. However, this is not only option for training on a large corpora, but also different
approaches such as masked language modelling, translation language modelling, etc. are available as well.

In order to achieve good results, typical pipeline of training includes following steps:
1. Pre-training on large corpora
2. Fine-tuning:
   1. Fine-tuning on specific set of tasks
   2. Instruction fine-tuning
3. Alignment using feedbacks

![Model Training flow](/assets/img/posts/model_training.png)

First step consists of just training on a huge number of samples that are just collected and cleaned in specific preprocessing steps.
This step which is one of most costly ones takes more time, cost and also considerations should be applied as well.
Fine-tuning on set of tasks which comes next is concerned with training a language model with specific NLP tasks such as sentiment analysis,
question answering, translation, etc. These tasks that are also as basic tasks that LLM should be able to perform is essential for its
understanding of instructions and being competent enough to apply them.

Alignment is also one of the most important steps that comes usually last! This step in training pipeline is mostly concerned with 
aligning the model with human preferences. Bias is one of the most significant topics in this case as well.

## LLM capabilities

One might think large language models as described, are just completing the sentences. This is true, but they also have other
capabilities that make them unique. For example, you can consider an example where a LLM tries to answer a question according to 
given information. Depending on the competency of the LLM, it might not only use the given information, but also use its own world-knowledge
that it gained during different steps of training. World knowledge helps it to know what is right in the context and what is not.

Specific tasks, especially mathematical ones, are very helpful too, because they help model to have at least a basic understanding of the 


# The Potential for Misinformation in GenAI: Hallucination

GenAI has the capacity to propagate misinformation due to its learning process. 
These models acquire patterns from their training data, generating outputs that often mirror the learned patterns. 
While the primary objective is pattern recognition, there are instances where these models inadvertently reproduce 
the exact content they were trained on. 
These gives rise to specific challenges, particularly concerning the rights and regulations associated with the training data. 
The following scenarios illustrate the problematic nature of outputs directly derived from training data:

1. **Copyrighted Material:** Instances where GenAI reproduces copyrighted intellectual property, such as books or paintings.
  
2. **Privacy Concerns:** Repeating back personal information, such as emails, bank account numbers, IBANs, etc. from training data.

Moreover, beyond these typical cases, there is a potential for fabrication. In specific instances, given the model's learned patterns, 
it can create false narratives around individuals. This introduces a more severe problem where real individuals are portrayed inaccurately and 
explained in a misleading manner.

Hallucination is a term used for this case.