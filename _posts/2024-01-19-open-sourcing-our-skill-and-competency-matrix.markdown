---
layout: post
title:  "Open Sourcing our Skills and Competency Matrix"
date:   2024-01-18
description: "We're excited to open source our skills and competency matrix for others to use. In this post we share the challenges we faced with earlier iterations, such as integrating our company values and adapting the matrices to evolving roles, which led us to creating a modular system that caters to diverse roles and career paths while aligning seniority expectations across the RnD department."
categories: personal-growth management
preview_image: /assets/img/posts/matrix-preview.png
author: "Franziska Hempel"
---

## The Path to Creating our Matrix

Our journey in creating a skills and competency matrix in RnD went through many stages.
Initially we started with a focus on our company values - <a href="/about#how-we-work-our-values" title="Read more about our core company values">Trust, Impact, Customer Success, and Ethics</a> - and used those as a foundation to describe seniority and career progression within the company.
We described how employees demonstrate **Trust** in their decisions and build trust within and outside the company or how they grow their influence and **Impact** from task-level contributions to organization-wide initiatives.

There were parts we liked about this approach, specifically that it created alignment on seniority expectations across different roles and had our company values at the core of how we evaluated behavior and measured performance.

However, we soon realized that while these values provided a clear alignment with company expectations, they were too vague to offer a precise progression roadmap.
For example, the value of **Impact** could translate into numerous skills and competencies, but it offered little specific guidance and thus wasn’t the best tool to provide a basis for feedback, map progress or inform our hiring.

To address this, we looked at how other companies were approaching career growth  and performance frameworks.
In Engineering we adopted the [Engineering Competency Matrix open sourced by Circle CI](https://docs.google.com/spreadsheets/d/131XZCEb8LoXqy79WWrhCX4sBnGhCM1nAIz4feFZJsEo/edit#gid=0){:target="_blank"}. This matrix provided clear skill areas for engineers, scaling them across six levels, and was a much better tool for discussing growth and progression. As this matrix is specifically designed for Engineering, other teams in the department adopted different matrices.
The Design Team used [Figma’s career level descriptions](https://www.figma.com/file/2dWuprgltGoSTjya6DsMmZ/Figma-Product-Design-%26-Writing-Career-Levels-(Community)?type=whiteboard&node-id=2-287&t=7pNa6Uk55gn7kjR5-0){:target="_blank"} and adapted them to fit our six seniority levels, while the Product Management Team took inspiration from Markus Müller, who has led product teams at N26 and Circ.
His  [skill matrix to grow, coach, assess, and hire product managers](https://medium.com/@markusmuller89/decoding-product-management-a-skill-matrix-to-grow-coach-assess-and-hire-world-class-pms-a385a4476866){:target="_blank"} was the foundation for the design of their skills and competency matrix.

Within a few months we ended up with different matrices in the RnD department, lacking a clear alignment on what seniority and specific seniority levels mean to us. While we did see the need for role specific skills, we wanted comparability in seniority across the different roles and paths. Additionally we felt these matrices didn’t fully reflect our unique angle and  company values - the one thing we had liked about our original matrix.

Another challenge we faced was adapting the matrices to new or evolving roles or different career paths. The needed skill set for our AI Researchers wasn’t reflected in the engineering matrix, so they needed their own. Introducing a new role for Applied AI engineers at the intersection of Research and ML Engineering meant we needed another version, causing a lot of work. All of those matrices also needed to reflect the different focus that employees on different career paths might have, from individual contributors to people managers.

So we set out with the goal of creating a system of skills and competencies that reflected our values, created comparable expectations of seniority and was easily adaptable so it could grow with us.

## Our Approach: A Modular Solution

We started by aligning on seniority levels to establish a common understanding across the entire department. We described what seniority means at every level, without focusing on role-specific skills. Using the Focus and Scaling of competencies from Circle CI’s matrix as a starting point, this is what we came up with:

<table class="table table-responsive">
    <thead>
        <tr>
            <th>Level</th>
            <th>Focus & Main Impact of work</th>
            <th>Scale of work</th>
            <th>Level Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="multiline">L7<br />(Junior)</td>
            <td rowspan="3" class="multiline rowspan">Focussed mainly on execution of work and being the best possible team member.</td>
            <td>within tasks</td>
            <td class="multiline">L7s participate actively in their team's discussions with their main focus on learning. Their speed of learning and improving influences directly how well they are doing. They understand their team's goals and contribute by working on tasks with guidance from their peers.</td>
        </tr>
        <tr>
            <td class="multiline">L6<br />(Mid Level)</td>
            <td>within epic / initiative</td>
            <td class="multiline">Still focussed mainly on learning, L6s can take ownership for smaller initiatives in their team. They actively bring in ideas of their own, aim to improve their team's guidelines and workflows and can contribute independently to initiatives. They actively seek help where needed.</td>
        </tr>
        <tr>
            <td class="multiline">L5<br />(Advanced)</td>
            <td>within team</td>
            <td class="multiline">L5s work independently within their team. They see problems and improvement areas in their team and can develop solutions with little guidance from others. At this stage L5s  start to specialise within a smaller area of their domain and actively share their knowledge with the team. They might start mentoring others, but their focus is still on the execution of work.</td>
        </tr>
        <tr>
            <td class="multiline">L4<br />(Senior)</td>
            <td rowspan="3" class="multiline rowspan">Additionally to individual work contributions, the focus shifts more towards facilitating, guiding, mentoring and multiplying others to take both the individual but also teams to the next level.</td>
            <td class="multiline">within team /<br />team's stakeholders</td>
            <td class="multiline">L4s are the strongest specialists within specific and focused areas of work and lead the improvement in those areas. They also start to grow their understanding of related domains and are able to apply their expertise to other areas to collaborate across disciplines. They own larger initiatives within their team and start to switch their focus from execution to enabling others around them. They guide and mentor others within their team and work with their team's stakeholders to drive alignment.</td>
        </tr>
        <tr>
            <td class="multiline">L3<br />(Staff / Head of)</td>
            <td>across several teams</td>
            <td class="multiline">L3s are specialists within a broad set of areas. They focus on cross-team initiatives and work with stakeholders and peers across multiple teams to drive initiatives forward. They focus on the big problems and initiatives  and focus on enabling the teams they work with to take ownership.</td>
        </tr>
        <tr>
            <td class="multiline">L2<br />(Principal / Director)</td>
            <td>across organisation</td>
            <td class="multiline">L2s work with multiple teams within their department and stakeholders across the entire business, aligning the needs of different departments. They own larger scale initiatives and seek improvements for the teams they work with.</td>
        </tr>
    </tbody>
</table>

When employees progress through the levels, their focus shifts from execution and learning within a team to facilitating, guiding, and leading across the organization. The scale of their work expands from tasks and initiatives to cross-organizational projects.

We then reorganized all our existing matrices to create a modular system that combined common skills (like communication & collaboration skills or business acumen) which were found in almost all of our matrices in one way or another with role-specific skills (for areas like engineering or design) and path-specific skills (like leadership or people management skills).
This approach was flexible enough to accommodate new roles and career paths as every role is essentially a combination of those modules, with the possibility to easily add a module should the need arise.

We also decided to reincorporate our core values into this matrix, ensuring they were not only specific attributes that we expect from all our employees but also underpinning principles in defining skills and expectations in all modules.

We spent most of our time making sure we had very clear definitions of the seniority levels as well as skill descriptions that reflected our values. Scaling those skills across the levels was a job that generative AI could then take over, so we used ChatGPT to help us articulate expectations for each skill across all the levels.

> The outcome is a modular system that balances specificity with adaptability, making seniority across disciplines comparable while providing a practical base for feedback and growth discussions.
>
> **We're proud to open-source this matrix under the Creative Commons Attribution 4.0 International license (CC BY 4.0), available here [LINK WILL COME].**

By open-sourcing our skills and competency matrix, we aim to share a framework that adapts and evolves with the dynamic landscape of roles and responsibilities. We believe this matrix can be a valuable tool for other organizations seeking a flexible yet structured approach to employee development and evaluation.

## Our Next Steps

A framework like this is never really finished and needs to grow and change with the company, so the version of the skills and competency matrix we are open sourcing today is only a first step.

This matrix is part of a larger growth and development framework, which includes regular 1:1s, continuous feedback from peers, managers and stakeholders and a quarterly cycle to create and review personal growth plans for every employee.

From Q1 2024 onwards we are rolling the new matrix out in the RnD department, testing it in our upcoming feedback cycle. This allows us to test it as a tool for evaluating performance, mapping progress, and creating concrete goals and growth plans. It will also be used when hiring for new roles to align on needs for the team and the evaluation of candidates. The feedback from these processes will allow us to iterate and adapt the matrix as needed.

Other departments within Ultimate have already shown interest in adopting the matrix for their teams. Over the next few months we will keep adding modules as needed and adapt the existing ones as our needs for this tool evolve.