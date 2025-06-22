# About vector databases

*Date: 2025-06-22*

Vector databases represent data as mathematical vector embeddings. A vector embedding is represented by an array of numbers. These vectors capture the semantic essence of the data.

### Common usages
- Semantic search
- AI retrieval (like RAG for LLMs)
- Recommendation systems
- Image/audio similarity search
- Fraud detection, anomaly detection

A vector can be used to represent complex data. This includes videos, images, text, audio, etc. These vectors are generated using embedding models, like CLIP, Wav2Vec, etc.

### How do embeddings work?
Embedding models convert text, images, or other data into vectors by learning patterns from training data. For example, "king" and "queen" would have similar vectors, while "king" and "banana" would be very different.

### How similarity is measured
Vector databases use distance metrics like:
- **Cosine similarity** - Measures angle between vectors
- **Euclidean distance** - Straight-line distance between points
- **Dot product** - Measures alignment of vectors

### How does search work in vector databases?

Vectors are high-dimensional, so naive search is too slow for large datasets. Vector DBs build indexes like:
- HNSW (Hierarchical Navigable Small World)
- IVF (Inverted File Index)
- Annoy, FAISS, etc.

These indexes allow Approximate Nearest Neighbor (ANN) search, trading a tiny bit of accuracy for massive speed gains.

When you search for an image, for example, the database finds similar vectors. Some search types are:
- KNN (K Nearest Neighbors)
- Similarity threshold
- Hybrid search

You can also filter metadata before and after the vector search.

#### Example: Text search with LLM and vector database (RAG)

`What is quantum computing?`

Computation steps:
1. Convert the question to a vector embedding
2. Vector DB finds the most semantically similar documents (based on stored embeddings)
3. Pass those docs to the LLM for a final, context-rich answer

### Popular vector databases
- **Pinecone** - Managed vector database service
- **Weaviate** - Open-source vector database
- **Qdrant** - High-performance vector database
- **Chroma** - Embedding database for AI applications

---

*Tags: vector databases, embeddings, search, AI, RAG*
