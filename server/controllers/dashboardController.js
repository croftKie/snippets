const Snippet = require("../models/snippet");
const Todo = require("../models/Todo");
const User = require("../models/User");
const mongoose = require("mongoose");

// Get dashboard
exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard | Keep your code!",
    description:
      "A note-taking application for all your important functions and snippets of code.",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const snippets = await Snippet.aggregate([
      { $sort: { createdAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.session.name) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Snippet.count();

    res.render("dashboard/index", {
      userName: "Kieran Croft",
      locals,
      snippets,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

// Get view specific snippet
exports.viewSnippet = async (req, res) => {
  const snippet = await Snippet.findById({ _id: req.params.id })
    .where({ user: req.session.name })
    .lean();

  if (snippet) {
    res.render("dashboard/viewSnippet", {
      snippetID: req.params.id,
      snippet,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("something went wrong");
  }
};

// PUT update specific snippet
exports.updateSnippet = async (req, res) => {
  try {
    await Snippet.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body }
    ).where({ user: req.session.name });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// DELETES specific snippet
exports.dashboardDeleteSnippet = async (req, res) => {
  try {
    await Snippet.deleteOne({ _id: req.params.id }).where({
      user: req.session.name,
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// GET add snippet
exports.dashboardAddSnippet = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

// GET add snippet
exports.dashboardAddSnippetSubmit = async (req, res) => {
  const user = await User.findById({
    _id: req.session.name,
  });
  try {
    req.body.user = new mongoose.Types.ObjectId(req.session.name);
    console.log(req.body);
    await Snippet.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("dashboard/add", {
      layout: "../views/layouts/dashboard",
    });
  }
};

// GET Search
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

//POST Search
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const searchResults = await Snippet.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.session.name });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

// GET todo list dash
exports.todoDash = async (req, res) => {
  const locals = {
    title: "To Do List | Keep your code!",
    description:
      "A note-taking application for all your important functions and snippets of code.",
  };
  let perPage = 12;
  let page = req.query.page || 1;
  try {
    const todos = await Todo.aggregate([
      { $sort: { createdAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.session.name) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await todos.length;

    res.render("dashboard/todoDash", {
      userName: "Kieran Croft",
      locals,
      todos,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

// // GET render List view
// exports.renderAddList = async (req, res) => {
//   const list_length = 1;
//   res.render("dashboard/addList", {
//     list_length,
//     layout: "../views/layouts/dashboard",
//   });
// };

// GET add new list
exports.todoAddList = async (req, res) => {
  try {
    await Todo.create({
      user: new mongoose.Types.ObjectId(req.session.name),
      title: "new to do list",
      list: [
        {
          text: "placeholder text",
          checked: false,
        },
      ],
    });
    res.redirect("/todo");
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard");
  }
};

// GET  view list
exports.viewList = async (req, res) => {
  res.render("dashboard/todoDash", {
    layout: "../views/layouts/dashboard",
  });
};

// UPDATE  add new list item to list
exports.updateList = async (req, res) => {
  res.render("dashboard/todoDash", {
    layout: "../views/layouts/dashboard",
  });
};

// DELETE delete list
exports.deleteList = async (req, res) => {
  res.render("dashboard/todoDash", {
    layout: "../views/layouts/dashboard",
  });
};
