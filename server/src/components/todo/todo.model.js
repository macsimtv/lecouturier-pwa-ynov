import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Todo', todoSchema);
