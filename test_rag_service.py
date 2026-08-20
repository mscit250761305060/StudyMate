import types

import pytest

from app.services import rag


class FakeResponse:
    def __init__(self, text):
        self.text = text


class FakeModelClient:
    def __init__(self):
        self.calls = 0

    def generate_content(self, **kwargs):
        self.calls += 1
        if self.calls == 1:
            raise rag.genai.errors.ServerError(503, {"error": {"message": "The service is currently unavailable."}})
        return FakeResponse("Recovered answer")


def test_generate_rag_answer_retries_on_server_error(monkeypatch):
    monkeypatch.setattr(rag, "search_similar_chunks", lambda query, *args, **kwargs: [types.SimpleNamespace(payload={"content": "Context text"})])
    fake_client = FakeModelClient()
    monkeypatch.setattr(rag, "client", types.SimpleNamespace(models=types.SimpleNamespace(generate_content=fake_client.generate_content)))

    answer = rag.generate_rag_answer("What is inheritance?")

    assert answer == "Recovered answer"
    assert fake_client.calls == 2
