# jejune-client

> A client for the Jejune system and other ActivityPub servers which
> support the C2S protocol and Jejune vocabulary.

![Screenshot](https://ariadne.space/.well-known/jejune/upload/5d9b55f6-ce69-4992-82f1-8c2e2c9d337b.jpg)

## Building

To run in dev mode, just do:

```
# yarn install
# yarn serve
```

To build a production build, just do:

```
# yarn build
```

## Important

This is a client for Jejune, a personal ActivityPub server.  It will
not work with Mastodon or Pleroma, as those platforms do not support
both the ActivityPub client protocol and Jejune vocabulary, which are
required for the client to function.

This client is also a work in progress and neither it nor Jejune itself
are recommended for production use by casual users.  Many features are
still missing or have not yet been fully developed.

## Usage

Typically, you may find the client at `/.well-known/jejune` on your
instance.  Paths outside of the management and object tree are reserved
for the public frontend plugin.

## Translators

At the moment, the client is not translatable.  This is planned to be
implemented in Milestone 2.  Stay tuned!