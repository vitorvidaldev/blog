# Retrieval-Augmented Generation (RAG)

*Date: 2025-06-21*

An explanation of Retrieval-Augmented Generation (RAG) - how AI systems can access external knowledge sources to provide more accurate and up-to-date answers, including the difference between basic RAG and agentic RAG with practical code examples.

### What is RAG?

Retrieval-augmented generation is what allows a chatbot (or any AI text generator) to use external knowledge sources to answer questions, instead of only relying upon what it learned during training.

**RAG itself is not a decision-maker or a tool-picker.** RAG is just the name of the pattern of gathering relevant documents or information from external sources and using them to improve answers.

#### How does this work in a chat?

1. You type a question
2. The system sends your question to a "retriever". This could be a search engine, a vector database, etc.
3. The retriever finds relevant documents or chunks of information
4. The retrieved documents are added to the AI's prompt as context, and the AI generates an answer using this augmented information
5. You get an answer that feels smart and specific to your data

#### Basic example

```python
from retriever import search_docs
from openai_api import call_llm

def rag_pipeline(user_question):
    # Step 1: Retrieve info
    relevant_docs = search_docs(user_question)

    # Step 2: Build prompt with docs
    context = "\n".join(relevant_docs)
    final_prompt = f"Answer the following question using the context:\n\nContext:\n{context}\n\nQuestion: {user_question}"

    # Step 3: Call LLM
    answer = call_llm(final_prompt)
    return answer
```

```python
def search_docs(query):
    # Example: naive keyword search in a list of documents
    all_docs = load_all_my_documents()
    return [doc for doc in all_docs if query.lower() in doc.lower()]
```

### What is agentic RAG?

In agents, RAG becomes part of the agent's reasoning process. The agent can decide when and what to retrieve as part of a bigger plan. It can reason about the task, decide when and how to retrieve info, maybe multiple times, and mix tools if needed.

[What is agentic RAG - IBM video](https://www.youtube.com/watch?v=0z9_MhcYvcY)

#### Agentic RAG example

```python
agent_state = initialize_agent_state(user_goal)

while not agent_state.done:
    next_action = llm.plan_next_action(agent_state)

    if next_action.type == "RETRIEVE":
        data = retriever.search(next_action.query)
        agent_state.add_context(data)

    elif next_action.type == "CALL_API":
        api_result = external_api_call(next_action.params)
        agent_state.add_context(api_result)

    elif next_action.type == "GENERATE_ANSWER":
        answer = llm.generate(context=agent_state.all_context, question=user_goal)
        agent_state.set_final_answer(answer)

return agent_state.final_answer
```

The `plan_next_action` might be something like the following:

```md
Goal: Summarize customer complaints.

Current context: [list of gathered info]

What should the next step be?
Choose from: [RETRIEVE, CALL_API, GENERATE_ANSWER]
```

---

*Tags: RAG, AI, agents, retrieval*
