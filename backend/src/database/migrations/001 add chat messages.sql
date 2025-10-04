CREATE TABLE chat_messages (
    id UUID PRIMARY KEY,
    created_at BIGINT NOT NULL,
    chat_id UUID NOT NULL,
    message TEXT NOT NULL,
    role TEXT NOT NULL
);