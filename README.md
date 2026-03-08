# ePubFlow

**ePubFlow** is a tool designed to transform files and text by applying a lexical highlighting format that facilitates fast reading (similar to the *Bionic Reading* style). The algorithm strategically highlights the first letters of each word, artificially guiding your eyes so your brain completes the rest of the word, significantly enhancing reading speed, fluency, and comprehension.

### Example Transformation

**Normal Text:**

Fast reading is a useful skill that allows you to absorb information more efficiently without sacrificing reading comprehension.

**Text Transformed by the Script:**

**Fa**st **read**ing **i**s **a** **use**ful **ski**ll **th**at **all**ows **y**ou **t**o **abso**rb **inform**ation **mo**re **effici**ently **with**out **sacrif**icing **read**ing **comprehen**sion.

---

## Collaborate With Us!

ePubFlow is an open source project and we would love your help to help it grow! Whether you're a developer, a designer, or just passionate about improving reading accessibility, there's a place for you:

- Improve the algorithm or add support for more languages/formats on the backend.
- Help refine the design and User Experience (UX/UI) of our frontend.
- Find and report *bugs*, or propose new ideas by opening an *Issue*.

**How to get started?** Fork the repository, create a new branch for your contributions, and send us your Pull Request. All help is welcome regardless of your experience level!

---

## Project Structure

A quick guide to how this repository is structured to help you find your way around quickly:

- **`/src/`**: Source code of the modern WebApp. Here live the React components, internal hooks, internal assets, and Tailwind styling configuration.
- **`/public/`**: Public static assets for the dev server (logos, icons).
- **`app.py` and `flask_app.py`**: The core data processing. Python scripts and the Flask backend server that process files and apply the bolding algorithm.
- **`/templates/`, `/css/`, `/imgs/`**: HTML templates, CSS styling, and traditional assets to run the Flask views and the download generator.
- **`tmp_clean.py`**: Utility Python script to keep the temporary file directory clean after generating the `.epub` files.
- **`package.json` and `pnpm-lock.yaml`**: Files that manage JS dependencies and local scripts utilizing `pnpm`.
- **`vite.config.ts`**: Configuration of the Vite bundler used to package the frontend environment.
- **`.github/workflows/deploy.yml`**: Automated GitHub Action that compiles the React build and handles the CI/CD pipeline deployment to GitHub Pages.

---
*This project is built by combining an agile analytical Python backend with a blazing fast React and TypeScript frontend.*
