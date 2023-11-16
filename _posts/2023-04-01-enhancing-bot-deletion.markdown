---
layout: post
title:  "Enhancing bot deletion through an event-driven setup"
date:   2023-04-01 10:00:00 +0100
description: "Bot deletion is a critical path in our workflow. Almost all of our data 
              is related to bots in one way or another, so deleting a bot is a process 
              that can run for quite some time.<br />
              But, why is this a problem? Our system is distributed in nature, which 
              means that we have multiple compute blocks running in the cloud, and that 
              makes our system prone to issues like losing nodes for network partitions etc.
              Moreover, the deletion is initiated from our frontend client. Keeping the 
              request alive until the entire deletion process is done is not an option 
              since in most cases the request will simply time out.<br />
              We needed a solution that can guard us against such issues. Our process 
              should be initiated without keeping the client waiting for a response, and 
              should be able to recover from failures that are very likely to happen due 
              to the distributed architecture of the system."
categories: backend events
preview_image: /assets/img/posts/language-detection.png
author: "Mohamed Abdelazim"
---