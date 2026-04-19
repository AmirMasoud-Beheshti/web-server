const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeocode = require("./utils/geocode");
const getForecast = require("./utils/forecast");

const app = express();

// Define path for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Amirmasoud",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Amirmasoud",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    email: "Amirmasoud763@gmail.com",
    name: "Amirmasoud",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address .",
    });
  }

  getGeocode(req.query.address, (error, { lat, lon, display_name } = {}) => {
    if (error) {
      res.send({ error });
    }
    getForecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: display_name,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({ products: [] });
});

app.use("/help", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Amirmasoud",
    message: "Help article not found!",
  });
});

// Catch-all 404
app.use((req, res) => {
  res.render("404", {
    title: "404",
    name: "Amirmasoud",
    message: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
