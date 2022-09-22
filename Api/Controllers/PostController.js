import Posts from "../Models/PostMessageModel.js";

export const getAllPosts = async (req, res) => {
  const { pages } = req.query;

  try {
    const limit = 6;
    const total = await Posts.countDocuments();
    const startIndex = (pages * 1 - 1) * limit;
    // lets say we have 3 pages so 3-1=2 two pages data mean 12 posts will be skipped and we dont want to show it on this page
    // but evry page will have a new data
    const data = await Posts.find().limit(limit).skip(startIndex);
    res.status(200).json({
      data,
      currentPage: pages * 1,
      totalPosts: total,
      numberOfPages: Math.ceil(total / limit),
    });
    // const data = await Posts.find();
    // res.status(200).json({
    //   len: data.length,
    //   data,
    // });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const posts = req.body;
  const userId = req.user?.id;

  try {
    const data = await Posts.create({ ...posts, creatorId: userId });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const deletePosts = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    const data = await Posts.findByIdAndDelete(id);
    res.status(200).json({
      data,
      user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const user = req.user;
    const data = await Posts.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data,
      user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Posts.find({ creatorId: id });
    res.status(200).json({
      len: data.length,
      data,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSearchedPosts = async (req, res) => {
  const { tags } = req.body;
  try {
    // $in means that in tags if this tag comming from req.body if it exists then give me those data
    // here we used i for case sensitive if text is in lower then it will covert it to uppper in vice verca
    const data = await Posts.find({ tags: new RegExp(tags, "i") });

    // const data = await Posts.find({ tags: /old/ });
    res.status(200).json({
      len: data.length,
      data,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getRelatedPosts = async (req, res) => {
  const { tags } = req.body;
  try {
    // $in means that in tags if this tag comming from req.body if it exists then give me those data
    // here we used i for case sensitive if text is in lower then it will covert it to uppper in vice verca
    const data = await Posts.find({ tags: new RegExp(tags, "i") });
    // const data = await Posts.find({ tags: /new/ });

    // const data = await Posts.find({ tags: /old/ });
    res.status(200).json({
      len: data.length,
      data,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
