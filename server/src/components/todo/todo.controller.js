import Todo from './todo.model.js';
import List from '../list/list.model.js';

import Joi from 'joi';

export async function index(ctx) {
    const { id } = ctx.params;

    try {
        const list = await List.findById(id);

        if (!list) {
            return ctx.notFound();
        }

        const todos = await Todo.find({ list: id });

        ctx.ok(todos);
    } catch (err) {
        ctx.badRequest(err);
    }
}

export async function create(ctx) {
    const { title, list_id } = ctx.request.body;

    const schema = Joi.object({
        title: Joi.string().required(),
        list_id: Joi.string().required(),
    });

    try {
        const { error } = schema.validate({ title, list_id });

        if (error) {
            return ctx.badRequest(error);
        }

        const list = await List.findById(list_id);

        if (!list) {
            return ctx.notFound();
        }

        const todo = await Todo.create({ title, list: list_id });

        ctx.created(todo);
    } catch (err) {
        ctx.badRequest(err);
    }
}

export async function update(ctx) {
    const { id } = ctx.params;
    const { title, completed } = ctx.request.body;

    const schema = Joi.object({
        title: Joi.string(),
        completed: Joi.boolean()
    });

    try {
        const { error } = schema.validate({ title, completed });

        if (error) {
            return ctx.badRequest(error);
        }

        const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });

        if (!todo) {
            return ctx.notFound();
        }

        ctx.ok(todo);
    } catch (err) {
        ctx.badRequest(err);
    }
}

export async function destroy(ctx) {
    const { id } = ctx.params;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return ctx.notFound();
        }

        await todo.remove();

        ctx.noContent();
    } catch (err) {
        ctx.badRequest(err);
    }
}