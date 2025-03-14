create or replace table documents (
  id bigserial primary key,
  content text, -- corresponds to the "text chunk"
  embedding vector(768) -- 1536 works for OpenAI embeddings
);
