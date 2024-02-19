---
layout: post
title:  "Schema Evolution at Ultimate"
date: 2024-02-14
description: "In a fast-paced environment, it's important to keep your data model up to date, concise as well as backwards/forward compatible. This is our story of how we evolve our event schemas."
categories: architecture
preview_image: /assets/img/posts/evolution.png
author: "Yonatan Wilkof"
link: "If this is a podcast link to where people can listen to it"
---

### The case for schema evolution

At Ultimate, we have been using event-based architecture for a while now. It has been a great way to decouple our systems and make them more resilient. 
A key component of event-based architecture is the event schema. The event schema is the contract between the producer and the consumer of the event. It defines the structure of the event and the data that it contains.
One of the challenges that we have anticipated would be the evolution of the event schemas. As our systems grow and change, the event schema needs to evolve as well. It is imperative, that said contracts do not break as properties are added, removed or changed.
In this article, I will lay out the design that we have chosen, to help us navigate through the treacherous waters of schema evolution.

### The underlying messaging architecture

In order to understand the design that we have chosen, it is important to understand the underlying messaging architecture that we have in place. We use Kafka as our messaging system. 
As a general rule, we have a topic per business domain owned by a publisher which is, in most cases, a microservice.

Take conversations for example: we have a topic called `conversations` and the `chat-orchestrator` microservice is the owner of that topic.
All updates in the lifecycle of a conversation (i.e. conversation start / visitor sends messages / bot send message / conversation end) are published to that topic, and in order that they happened.
As a consumer of this topic, a service can subscribe and infer what and when happened during that conversation.

### The guiding principles

The design that we have chosen is based on the following principles:
- **Backwards compatibility**: New versions of the schema should be able to be consumed by old versions of the consumer, even if they do not parse new data points added over time.
- **Forward compatibility**: Old versions of the schema should be able to be consumed by new versions of the consumer.- **Predictability**: Each topic should be tied to exactly one schema, even if it handles multiple events types. As such, a consumer can always know which schema to use when consuming from a topic.
- **Predictability**: Each topic should be tied to exactly one schema, even if it handles multiple events types. As such, a consumer can always know which schema to use when consuming from a topic.
- **Conciseness**: The schema should be concise and easy to understand. An event should not contain any unnecessary data points.

Schema evolution is there to help with the first two principles. It is the process of changing the schema of an event in a way that is backwards and forwards compatible.
However, the other two principles are also important. They are important because they make the system more robust as well as easier to understand.

### The schema registry
A pretty common pattern to solve the problem of schema evolution is to use a schema registry. A schema registry has other benefits, such as message validation, but while important, those were not our focus.

Kafka has native support to a [schema registry](https://docs.confluent.io/platform/current/schema-registry/index.html), however due to various reasons outside the scope of this article, we use Google Pub/Sub.
While Google is making the first moves towards the idea of schema validation, as of that moment in time, Pub/Sub did not support full evolution semantics.
Therefore, in order to achieve the principles we focus on, we had to choose a technology and follow a paradigm, that would effectively replace some of the missing functionalities of a registry.

### Protobuf
In order to aid us in the process of schema evolution, we have chosen to use [Protobuf](https://developers.google.com/protocol-buffers) as our serialization format.
Protobuf is a language-agnostic serialization format developed by Google. It is designed to be backwards and forwards compatible - which is achieved by a set of rules that the schema must adhere to.
For example, you can add new fields to a message, but you cannot remove or change the type of existing field. All fields are optional by default, and you can add new fields without breaking the schema.

In order to enforce said rules we rely heavily on [Buf](https://buf.build/), which is a tool that ties well with the Protobuf ecosystem and its rules.
It supplies a set of pipeline actions that aid us in the process of schema evolution, such as linting and breaking change detection.
Before every commit we verify that changes will retain compatability.


```yaml
name: buf-pull-request
on: pull_request
jobs:
  lint:
    name: "Lint Files"
    runs-on: preemptible-runners
    steps:
      - uses: actions/checkout@v3
      - uses: bufbuild/buf-setup-action@v1.18.0
        with:
          version: 1.18.0
      - uses: bufbuild/buf-lint-action@v1
        with:
          input: 'src/proto'
  validate:
    name: "Validate Files"
    runs-on: preemptible-runners
    steps:
      - uses: actions/checkout@v3
      - uses: bufbuild/buf-setup-action@v1.18.0
        with:
          version: 1.18.0
      - uses: bufbuild/buf-breaking-action@v1
        with:
          input: 'src/proto'
          against: 'https://github.com/${GITHUB_REPOSITORY}.git#branch=main,subdir=src/proto'
```
With the aid of such flow, we are able to do compile time message validation. That is, we do not validate message at publish time (as offered by schema registry), 
but rather ensure that the code which serializes and deserializes the message is in line with the schema.


### The Ultimate Design

Taking into account all the principles that we sought to achieve, alongside the architecture we have in place, we have come up with the following design:

```protobuf
syntax = "proto3";

package backend.chat_orchestrator.bot_events.v1;

import "google/protobuf/timestamp.proto";
import "google/protobuf/struct.proto";

message BotSubject {
    string event_id = 1;
    string bot_id = 2;
    google.protobuf.Timestamp event_timestamp = 3;
    int32 version = 4;

    enum EventType {
        EVENT_TYPE_UNSPECIFIED = 0;
        EVENT_TYPE_BOT_CREATED = 1;
        EVENT_TYPE_BOT_UPDATED = 2;
        EVENT_TYPE_BOT_DELETED = 3;
    }

    EventType event_type = 5;

    oneof event {
        BotCreated bot_created = 10;
        BotUpdated bot_updated = 11;
        BotDeleted bot_deleted = 12;
    }

    message Bot {
        string name = 1;
        optional string industry = 2;
        optional string selected_chat_platform = 3;
        float confidence_threshold = 4;
    }

    message BotCreated {
        Bot bot = 1;
        string created_by = 2;
    }

    message BotUpdated {
        Bot bot = 1;
        string updated_by = 2;
    }

    message BotDeleted {
        string deleted_by = 1;
        string reason = 2;
    }
}

```

In the above example, we have a **BotSubject** for bot events. Subject in this case, correlates to the single schema attached to a topic, and can accommodate multiple event types. 

Some of the properties such as `event_id`, `event_timestamp` are common to all events and handle event metadata.
In addition, we added the `version` property, which is used to handle schema evolution. It is only incremented in the highly unlikely case of a breaking change.

The `event_type` property is an enum that defines the type of the event, and it should  correlate to the concrete event that is published. In this case - a bot is either created, updated or deleted.
Defining each one of these events separately and having the type as enum, unlocks the following;
1. Each event can be extended separately from the others.
2. Adding new events types that are unknown at this stage can be done later.

The `oneOf` operator is used to define the populate event data that are published, as event types are mutually exclusive.
And event cannot denote both bot created and bot deleted at the same time, for example.
Each property in the `oneOf` set correlates, as expected, to a business event that is published in the topic.

### Breaking Changes
But what should we do in the case of a breaking change? 

Schema evolution cannot help us there, as it is not possible to make a breaking change and still be backwards compatible.
In the case of a breaking change, we have to create a new topic with a new version of the subject. 
We do this by creating a new subject under a new path (adhering to the naming convention of the protobuf package), and then creating a new corresponding topic.
The new topic will be owned by the same microservice as the old topic, and it will be used to publish the new version of the event.
After some time, the old topic, if necessary, can be dropped

### Conclusion
In this article, I have laid out the design that we have chosen to help us navigate through the treacherous waters of schema evolution.
Leveraging Protobuf and Buf has helped us to bridge the gap of the lack of a schema registry service.
By following a certain set of rules and conventions, we are able to accommodate the ever-changing needs of our business, while moving fast and reliably.
