import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mydb');

const FormSchema = new mongoose.Schema({
    map: String,
    time: String,
});

const FormModel = mongoose.model('Form', FormSchema);

export default FormModel;