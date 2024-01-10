---
layout: post
title:  "DRY in GitHub Actions with reusable workflows"
date:   2023-12-22
description: "GitHub actions are a central piece on our CI/CD system. We've been using it for less than 2 years (migration from bibucket) - but since minute 1 it was clear for us it was fundamental to focus on scalability and usability<br />
              Before jumping into features and complex scripting, we talked about the arquitecture - how would it look like for a developer to start working on a new repository, and how would it look for us to deal with a new feature or fix on existing workflows<br />
              Composite actions and reusable workflows were in our radar - but only intra-repo (using the same workflow to deploy to dev, stage and prod on different scenarios). In this post you will find how our journey started, which problems we solved and how does our future look like"
categories: CI/CD pipelie
preview_image: /assets/img/posts/reusable_workflows_preview.png
author: "Roberto Gutiérrez Sopedra"
---

## The start of the CI/CD journey in GitHub, or why a distributed CI/CD system can be a bad idea

Amidst the CI/CD journey in GitHub, our initial transition from Bitbucket was marked by a deliberate and gradual pace. Initially, we had a handful of repositories for select microservices. ArgoCD was already an integral part of our deployment with Bitbucket, and our early CI/CD setup in GitHub reflected simplicity with the following architecture:

![initial_architecture_diagram](../assets/img/posts/reusable-workflows_initial_arquitecture.png)

Having a look at this distrubuted architecture we can find some strong points to discuss

**Pros:**

- **Decentralized Ownership:** Each team takes full responsibility for their CI/CD processes, reaching out for assistance only when needed.

- **Simplicity:** The system is straightforward, avoiding unnecessary complexities.

- **Customizability:** Teams can easily tailor the CI/CD to meet their specific requirements.

**Cons:**

- **Limited Knowledge Sharing:** There's minimal exchange of knowledge among teams, hindering the overall growth of the CI/CD system.

- **Challenges with Horizontal Movement:** In instances of team switches, adapting to a new way of working becomes necessary, even if it doesn't necessarily improve the workflow.

- **Manual Repetition:** Implementing new features or fixes often involves manual tasks like copying and pasting across every repository, leading to errors, adaptation challenges, and workflow disruptions.

- **Loss of Feature Tracking:** Some CI/CD features developed in specific repositories get lost when those repositories are archived.

- **Uncertainty in Setup:** Creating a new repository prompts questions about the correct procedures. Uncertainties arise regarding test execution during PRs, deployment timings, and methods.

- **Documentation Challenges:** Maintaining documentation proves to be difficult, posing challenges for newcomers attempting to grasp the processes in place.

As platform engineers, enhancing developers' experience falls within our responsibilities. We opted to address these "cons" collaboratively with the developers.

## Decisions, decisions, decisions

For many of us, it became evident that the distributed CI/CD system lacked scalability, with the cons significantly outweighing the pros. The decision to explore a centralized solution led us to consider [reusable workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows). 
However, achieving a central solution meant reaching a consensus with the developers to harmonize their practices as much as possible. While reusable workflows offered high customizability, our focus was on establishing a unified approach. Our role was more about guidance and advice, avoiding the imposition of a "better way, trust me."

Recognizing the need for continuous improvement, we didn't aim for perfection from the get-go. We anticipated numerous iterations and aimed for a good-enough initial product that could easily evolve, rather than a flawless but untouchable crystal. With this mindset, we presented a set of questions to the developers:

1. **Testing in the GitHub Flow:** When should tests be executed? Upon opening the PR? After merging into the main branch? When pushing any branch? All of the above?

2. **Dev Environment Deployment:** When is the appropriate time for a deployment to the "dev" environment?

3. **Staging Environment Deployment:** When is the suitable time for a deployment to the "stage" environment?

4. **Production Environment Deployment:** When is it appropriate for a deployment to the "prod" environment? Should everyone have the ability to deploy to prod, and are there any time constraints (e.g., avoiding deployments on Fridays)?

5. **Deployment Announcements:** How should a deployment to prod be announced?

6. **Rollback Procedures:** What is the process for initiating a rollback?

## How to: Central workflows

Initially, callable workflows were limited to public or internal repos, excluding private ones. Fortunately, this changed a year ago, and now callable workflows are also accessible for private repos within the same organization.


For your first workflow, just follow these steps:
###### 1. Create a new repository
###### 2. Develop a new workflow under .github/workflow, with the following condition:
```yaml
on:
  workflow_call:
```

###### 3. Add any reusable job you need. In our case, linting the PR title was one of our simplest workflows:

```yaml
name: "Lint PR title"

on:
  workflow_call:
    inputs:
      requireScope:
        required: false
        type: boolean
        default: false
        description: "Whether scope of PR title is required - feat(SCOPE): subject"
      subjectPattern:
        required: false
        type: string
        default: ^(?![A-Z]).+$
        description: "Regex for subject of PR title - feat(SCOPE): subject"
      subjectPatternError:
        required: false
        type: string
        default: 'The subject "{subject}" found in the pull request title "{title}" did not match the configured pattern. Please ensure that the subject does not start with an uppercase character'
        description: "Error to show when subject does not match subject regex"
      allowed_types:
        required: false
        type: string
        default: |
          fix
          feat
          breaking
          minor
          major
          patch
        description: "Types allowed in PR title - TYPE(scope): subject"
  
env:
  REQUIRE_SCOPE: ${{ inputs.requireScope }}
  SUBJECT_PATTERN: ${{ inputs.subjectPattern }}
  SUBJECT_PATTERN_ERROR: ${{ inputs.subjectPatternError }}
  ALLOWED_TYPES: ${{ inputs.allowed_types }}


jobs:
  main:
    name: Validate PR title
    runs-on: preemptible-runners
    steps:
      - uses: amannn/action-semantic-pull-request@v5.0.2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          types: |
            ${{ env.ALLOWED_TYPES }}
          requireScope: ${{ env.REQUIRE_SCOPE }}
          subjectPattern: ${{ env.SUBJECT_PATTERN }}
          # If `subjectPattern` is configured, you can use this property to override
          # the default error message that is shown when the pattern doesn't match.
          # The variables `subject` and `title` can be used within the message.
          subjectPatternError: ${{ env.SUBJECT_PATTERN_ERROR }}
```
Don't feel overwhelmed, this just lints the PR title, making sure developers follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

###### 4. Call this workflow from wherever you want, you don't even need to merge:
```yaml
name: "Lint PR title"

on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize

jobs:
  lint_pr_title:
    uses: {name_of_your_org}/{name_of_your_repo}/.github/workflows/{your_file}.yml@{your-branch}
    secrets: inherit
    with:
      subjectPattern: ([-a-zA-Z0-9]{2,5}[/-]{1}[0-9]+.*)
```

Ideally, once a workflow is tested and you're happy with it, you should merge it to the main branch and create a new release - which is what developers should be using, releases! 

For your nth workflow/feature, just follow these steps:
1. Have a dummy microservice repository to do every kind of destructive testing
2. Never merge to main in your central-workflows repo without testing, it's the key piece for CI/CD. 

Summing up: 
![how to test reusable workflows](../assets/img/posts/reusable-workflows_how_to_test.png)

## The current, but not final, outcome 

![central_CICD_system](../assets/img/posts/reusable-workflows_central_workflows.png)


To give you a more precised look, our CI/CD system from a developers POV: 

![developers POV](../assets/img/posts/reusable-workflows_developers-POV.png)


In simpler terms, the process is entirely automated, unified and customized to meet the developers' requirements. Numerous changes, new features, and fixes have been introduced through various releases. However, the central workflows enable us to provide a solution that evolves rapidly while allowing developers to choose their own pace—some are content with version 0.17.0, while others prefer 0.18.19. As time progressed, the frequency of fixes diminished, allowing us to shift our focus to introducing new features that may not be universally needed by all developers, and that's perfectly acceptable.
Some of our newest features include:
1. Better caching
2. Slack notifications (And improved slack notifications)
3. GAR support
4. Customizable NPM version
5. Improved e2e tests result communication
6. Automation of Changelog
7. Multiple application - one repo support. 
...

## What's in the horizon
New releases are happening weekly at least, but I'd see our three major focuses for the mid-term future would be:

1. **Dynamic/Preview Environments:** The era of testing locally is so 2020. We envision a future where creating a PR automatically generates a temporary environment, 100% equivalent to dev, enabling developers to experiment freely.

2. **Enhanced Efficiency:** Centralizing the CI/CD system magnifies the impact of every improvement or decrement in quality across the entire system. As we move forward, priorities lie in optimizing caching, improving efficiency, and fortifying robustness, underscoring their heightened significance.

3. **Automated Testing of Workflows:** A more robust testing system is on the horizon, simplifying the process for developers to explore new features or fixes on the central workflows repository. This initiative aims to make the adoption of changes smoother and more enticing for developers.


