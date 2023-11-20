// Get Homepage

exports.homepage = async (req, res) => {
  const locals = {
    title: "Snippets | Keep your code!",
    description:
      "A note-taking application for all your important functions and snippets of code.",
  };
  res.render("index", {
    locals,
    layout: "../views/layouts/home-page",
  });
};

// Get About Page

exports.about = async (req, res) => {
  const locals = {
    title: "About Snippets | Keep your code!",
    description:
      "A note-taking application for all your important functions and snippets of code.",
  };
  res.render("about", locals);
};

// Get Features Page

exports.features = async (req, res) => {
  const locals = {
    title: "Snippet Features | Keep your code!",
    description:
      "A note-taking application for all your important functions and snippets of code.",
  };
  res.render("features", locals);
};

// Get FAQ Page

exports.faq = async (req, res) => {
  const locals = {
    title: "Snippet FAQ | Keep your code!",
    description:
      "A note-taking application for all your important functions and snippets of code.",
  };
  res.render("faq", locals);
};
