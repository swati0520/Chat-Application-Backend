const mongooes = require("mongoose");
const postSchema = new mongooes.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    file: {
      type: String,
    },
    userId: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
  },
  { timestamps: true }
);

postSchema.add({
  comments: [
    {
      user: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
      },
    },
  ],
  like: [
    {
      type: mongooes.Schema.Types.ObjectId,
      ref: "users",
    }
  ]
});

module.exports = mongooes.model("posts", postSchema);
