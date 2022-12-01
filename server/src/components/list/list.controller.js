import List from "./list.model.js";
import Todo from "../todo/todo.model.js";

import Joi from "joi";

export async function index(ctx) {
    const lists = await List.find();

    ctx.ok(lists);
}

export async function show(ctx) {
    const { id } = ctx.params;
    try {
        const list = await List.findById(id);

        if (!list) {
            return ctx.notFound();
        }

        ctx.ok(list);
    } catch (err) {
        ctx.badRequest(err);
    }
}

export async function create(ctx) {
    const { title } = ctx.request.body;

    try {
        const list = await List.create({ title });

        ctx.created(list);
    } catch (err) {
        ctx.badRequest(err);
    }   
}

export async function update(ctx) {
    const { id } = ctx.params;
    const { title } = ctx.request.body;

    try {
        const list = await List.findByIdAndUpdate(id, { title }, { new: true });

        if (!list) {
            return ctx.notFound();
        }
    
        ctx.ok(list);
    } catch (err) {
        ctx.badRequest(err);
    }
}

export async function destroy(ctx) {
    const { id } = ctx.params;

    try {
        const list = await List.findByIdAndRemove(id);

        if (!list) {
            return ctx.notFound();
        }

        ctx.noContent();
    } catch (err) {
        ctx.badRequest(err);
    }
}