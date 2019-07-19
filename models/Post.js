const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({

  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  images: {
    type: [],
    require: true,
  },
  school: {
    type: String,
  },
  department: {
    type: String,
  },
  gender: {
    type: String,
  },
  tag: {
    type: [],
  },
  time: {
    type: Date,
    require: true,
  },
  sourceLink: {
    type: String,
    require: true,
    index: { unique: true },
  },
}, {
  versionKey: false,
  timestamps: { createdAt: 'createdAt' },
});


const DcardSchema = PostSchema;
const MeteorSchema = PostSchema;
const PttSchema = PostSchema;

module.exports.Dcard = mongoose.model('dcard', DcardSchema, 'dcard');
module.exports.Meteor = mongoose.model('meteor', MeteorSchema, 'meteor');
module.exports.Ptt = mongoose.model('ptt', PttSchema, 'ptt');
