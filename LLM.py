
import os

import openai

from langchain import PromptTemplate
from langchain.vectorstores import Chroma
from langchain.embeddings import SentenceTransformerEmbeddings

from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain

from dotenv import load_dotenv


# Load environment variables from .env
load_dotenv()
open_api_key = os.environ.get('OPENAI_API_KEY')
openai.api_key = open_api_key

from link_of_books import books_links






template = """  Use the following pieces of context to answer the question at the end.
                If you don't know the answer, just say that you don't know, don't try to make up an answer.
                Always say "thanks for asking!" at the end of the answer.
                {context}
                Question: {question}
                Helpful Answer:"""


prompt =  PromptTemplate(
    input_variables=["context", "question"], template=template
)

model_name = "gpt-3.5-turbo-16k"

class LLM_ANSWER:
  def __init__(self):
#    embdings =  OpenAIEmbeddings(model="text-embedding-ada-002")
    embdings = SentenceTransformerEmbeddings(model_name="pre_trained_embeddings/sentence-transformers_all-MiniLM-L6-v2")
    self.db = Chroma(persist_directory= "ChromaDB_on_all_data",embedding_function=embdings)
    llm = OpenAI(model_name=model_name, temperature=0.1,max_tokens=512, top_p=1)
    self.chain = load_qa_chain(llm, chain_type="stuff", prompt=prompt)

  # generate answers
  def give_keywords(self, query):
    search = self.db.similarity_search(query,k=3)
    return search

  def get_answer(self, query):
    links = books_links(query)
    if links == []:
      links= ""
    similar_docs = self.give_keywords(query)
    answer = self.chain.run(input_documents=similar_docs, question=query)
    return answer +"\n   You can check this link for more information " + "\n          " + str(links)  
