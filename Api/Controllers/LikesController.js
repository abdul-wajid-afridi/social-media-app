import Posts from "../Models/PostMessageModel.js";

export const LikePost = async (req, res) => {
  const { id } = req.params;
  const postLike = await Posts.findById(id);
  console.log(req.user);
  try {
    const index = await postLike.likeCount.findIndex(
      (id) => id === String(req.user.id)
    );
    if (index == -1) {
      postLike.likeCount.push(req.user.id);
    } else {
      postLike.likeCount = postLike.likeCount.filter(
        (it) => it.id !== String(req.user.id)
      );
    }
    const updatedPost = await Posts.findByIdAndUpdate(id, postLike, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }

  // try {
  //   const data = await Posts.findByIdAndUpdate(
  //     id,
  //     { likeCount: getLike.likeCount + 1 },
  //     { new: true }
  //   );
  //   res.status(200).json({
  //     count: getLike.likeCount,
  //     status: "success",
  //     data,
  //   });
  // } catch (error) {
  //   res.json({
  //     error: error.message,
  //   });
  // }
};
