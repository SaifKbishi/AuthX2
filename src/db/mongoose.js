const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://firstUser:FG12XZ123@cluster0.y3jty.mongodb.net/auth?retryWrites=true&w=majority',
{
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true,
 useFindAndModify: false, 
});
