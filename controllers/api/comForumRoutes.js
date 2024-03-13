const router = require('express').Router();
const { User, ForumPost, ReplyPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
    const forumPostData = await ForumPost.findAll({  
      include: [{ model: User, attributes: ['name', 'email'] }],
    });
    const forumPosts = forumPostData.map((post) => post.get({ plain: true }));

    res.status(200).json(forumPosts); 
    } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await ForumPost.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to create forum post' });
    }
});

// // Update Post
// router.put("/:id", withAuth, async (req, res) => {
//     try {
//       const updatedPost = await ForumPost.update(req.body, {
//         where: { id: req.params.id },
//       });
  
//       if (!updatedPost) {
//         res.status(404).json({ message: "No post found with that id!" });
//         return;
//       }
//       res.status(200).json(updatedPost);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   // Delete post
//   router.delete('/:id', withAuth, async (req, res) => {
//     const postId = req.params.id;
//     console.log('Received request to delete post with ID:', postId);

//     try {
//         const forumPostData = await ForumPost.destroy({
//             where: {
//                 id: req.params.id,
//                 userId: req.session.userId,
//             },
//         });

//         if (!forumPostData) {
//             res.status(404).json({ message: 'No post found with this id!' });
//             return;
//         }

//         res.status(200).json({ message: 'Post deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting post:', err);
//         res.status(500).json({ message: 'Failed to delete post' });
//     }
// });

// // Reply to post
// router.post('/:postId/reply', withAuth, async (req, res) => {
//     try {
//         const { content } = req.body;
//         const postId = req.params.postId;
//         const userId = req.session.userId;

//         const newReply = await ReplyPost.create({
//             content,
//             forumPostId: postId,
//             userId
//         });

//         res.status(201).json(newReply);
//     } catch (err) {
//         console.error('Error posting reply:', err);
//         res.status(500).json({ error: 'Failed to post reply' });
//     }
// });

module.exports = router;
