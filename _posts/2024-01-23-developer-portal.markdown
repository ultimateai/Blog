---
layout: post
title:  "What we learned building our Ultimate developer portal"
date: 2024-01-23
description: "Our story of searching for good tooling around public APIs documentation, and deciding to write it ourselves."
categories: CI/CD pipeline
preview_image: /assets/img/posts/reusable-workflows_preview.png
author: "Damian Bojar"
---

## Developer portal who?

For the last few years, we used GitHub pages to share documentation about our public APIs. With growing interest in that part of our product, we decided to invest our time into creating a proper developer portal. Your public API documentation is like the business card for your company, it may be hard to measure but it will have an impact on your success. Having good public apis documentation could very well be the difference between signing and not signing and a new client. The core idea of a developer portal is to make learning about your apis as easy as possible. It's used mostly by developers from other companies, the tricky part is that it's also produced by your developers. More about the challenges that come from that later on.

## Figuring out what we need

I kicked off the project by listing the requirements for a perfect solution:
- easy to maintain
- easy to add new APIs and articles
- focused purely on public API documentation
- support for Swagger API definitions and webhooks
- version Control and enforceable reviews before realese
- support for automatic Swagger upload from various repositories
- not too expensive

Right away, we dove deep into what's out there already. After exploring some of the most popular solutions like SwaggerHub, Redocly, or Stoplight, We concluded that we have to write it ourselves. This was far from the ideal outcome from the research phase, but every solution had different problems. It seems that most of the products on the market went in the direction of having too many features in them, from organizing Jira tickets straight to managing infrastructure. At the same time, we did not see many tools with clear focus on customer-facing documentation. The tools we did like were quite expensive and most of the time scaled the monthly price with number of users. With over 20 engineers using the tool and our growth plans, having this kind of cost scaling was just not in the starts for us. The requirements were strict and we did not want to compromise on quality.


## The big decision

While writing the solution yourself, there is a high initial cost, it would pay for itself with time. It also meant that we would be able to have something that fulfills all of our needs. To kickstart the project we decided to go with a free template and make it our own. The first question we have to answer is how do we write the articles. After doing brief research on best practices, it was clear that we should keep the documentation and Markdown format. The Markdown format enables developers to focus purely on content while styling it and keeping a uniform design is up to the portal itself. This would also mean that we simply use it to Version Control the articles, this already solved the issue of having a solid process to publish new content. The next part was getting the Swagger in there, having the project in GitHub meant that it was very easy to enrich actions on other repositories to push the Swagger into the developer portal repository. All that's left is for the front end to properly style it and implement the features we need.

## Challenges we faced

The project took more time than we initially expected, and there were challenges that we did not anticipate. One of the challenges was the English language itself. Everyone in our backend team speaks English, but turns out there is a big difference between communicating in English and writing customer-facing articles well. Writing customer-facing content can prove difficult even for native English speakers. Having multiple developers contribute to the content, uniformity, tone, and style of the Articles became a challenge. To combat this, we made it a requirement to have the article go through a review process from talented english native speakers to conform to the rest of the documentation. We went through a very similar process with graphics and pictures for the articles, we go through a graphic designer for each picture to conform to the Ultimate brand.

## If it only have been so easy

We were certainly not into reinventing the wheel, and so we tried every existing solution that we could put our hands on. Unfortunately, most of the open source projects that we tried were either outdated, required us to use iframes or were simply not flexible enough. We made the bold move to build from scratch and after a quick tango with Next, we decided to go for GatsbyJS as a static website generator. The main point in favor of Gatsby was its flexibility when it comes to working with Markdown and images, which is really the core of this project. On top of it, the ability to create pages programmatically and to use GraphQL internally allowed us to tailor the project’s structure to match our workflows. As for generating the API Documentation from our Swagger file, the ‘openapi3-ts’ package on npm gave us the TypeScript definitions we could use in the props of our UI components, making it a quick and smooth experience to create this simple and sleek documentation that we so appreciate ourselves when reading about the technologies we use and love.

During the creation of the developer portal, we refactored the structure of documents multiple times. It's not an easy task to make the journey of learning our APIs a breeze. We have decided to split the documentation into a general section, and an API-specific section. The general section itself has
a different sub-menu for general articles and tutorials. The general articles go through the topics that are shared between all of the APIs, for example, security practices and tokens. While the tutorials focus on achieving something concrete in our system. The API-specific section starts with a Swagger API spec and webhooks article. Then it mimics the structure of the general articles, with the difference that this time the articles are only about the single API.

## Closing thoughts

It's been a long road with the Developer Portal, but the work makes the reward even sweeter. Once the project is ready there are no monthly payments, limitations on users, and the portal is there to last. The maintenance cost is next to nothing. No new features will come for free but having developed all the features we actually care about is like having a tailor made suit. We are able to align our processes as we like with code review, content reviews, version control and aromatization with Github actions. I would wholeheartedly recommend this approach to anyone if they prioritise long therm benefits over having something out quick. Please feel free to reach out to us if you have any questions. 





