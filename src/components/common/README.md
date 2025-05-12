# components/common

## Purpose

This directory contains shared components used across the entire application.

## When to Place a Component Here

A component should be placed in common only if it meets the following criteria:

✅ Stateless – Does not rely on internal state. ✅ Context-independent – Does
not depend on a specific context or page. ✅ Highly reusable – Used in multiple
places across the application.

## Guidelines

Before adding a component here, consider:

Prefer placing it in components/[page_name] if it’s only used on a specific
page.

Move to common only if the component is truly reusable across different parts of
the app.
