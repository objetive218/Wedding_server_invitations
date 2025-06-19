if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const Single = require("./models/single");
const Notes = require("./models/notes");
const { default: helmet } = require("helmet");

const app = express();
app.use(cors());

app.use(express.json());
app.use(
  helmet(
    { crossOriginResourcePolicy: false },
    {
      referrerPolicy: false,
    },
    {
      xPermittedCrossDomainPolicies: false,
    },
    {
      referrerPolicy: false,
    },
    { crossOriginEmbedderPolicy: false }
  )
);
connectDb();

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/invitations", async (req, res) => {
  const invitations = await Notes.find();
  if (res) {
    res.json({ invitations: invitations });
  } else {
    res.status(404).end();
  }
});

app.get("/invitations/:id", async (req, res) => {
  const invitationId = req.params.id;

  const invitation = await Notes.findById(invitationId);
  if (invitation) {
    res.json({ invitation: invitation });
  } else {
    res.status(404).end();
  }
});

app.post("/invitations", async (req, res) => {
  const name = req.body.name;
  const attendance = req.body.attendance;
  const body = req.body.body;
  const id = req.body.id;
  const members = req.body.members;
  const seen = req.body.seen;
  const typeInvitation = req.body.typeInvitation;
  const confirmation = req.body.confirmation;
  const gender = req.body.gender;

  const notes = await Notes.create({
    _id: id,
    name: name,
    attendance: attendance,
    body: body,
    members: members,
    seen: seen,
    typeInvitation: typeInvitation,
    gender: gender,
  });
  if (notes) {
    res.json({ notes: notes });
  } else {
    res.status(404).end();
  }
});

app.put("/invitations/:id", async (req, res) => {
  const invitationId = req.params.id;

  const attendance = req.body.attendance;
  const confirmation = req.body.confirmation;
  await Notes.findByIdAndUpdate(invitationId, {
    attendance: attendance,
    seen: true,
    "members.confirmation": confirmation,
  });

  const invitation = await Notes.findById(invitationId);
  if (invitation) {
    res.json({ invitation: invitation });
  } else {
    res.status(404).end();
  }
});

app.listen(process.env.PORT);
