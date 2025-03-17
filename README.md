# CatGPT

Chat app with OpenAI integration. Using gpt-4o-mini.

## Persisting Data into SQL

Currently, data will not be persisted into any database. The following is a
thinking on how to implement this (not sure will work, need to try out).

- Update the TRPC endpoint calling OpenAI API. After getting response text from
  OpenAI, save the response into database (using either SQL client or ORM like
  Prisma) before sending the response text to front end to update conversation
  state.
- The data stored in database has to be loaded when conversation component is
  mounted. For that, use a wrapper component. This wrapper component will be a
  server component calling another TRPC endpoint to retrieve conversation data.
  This wrapper component will then pass its fetched data as prop into a client
  component to be saved as state.
- To support multiple conversations, dynamic route segments have to be used, and
  the TRPC endpoint will retrieve data accordingly (e.g. ID of row in SQL =
  value of the dynamic part of route).
