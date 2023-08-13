import express, { json } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(json());

const contacts = [
  {
    namne: "Pedro Perez",
    tlf: "22997145377",
    email: "jeancentno54@gmail.com",
    direccion: "Las Casitas De Monte Velde",
    id: 1,
  },
  {
    name: "Maria Magdalena",
    tlf: "68999090886",
    email: "mariamagda@gmail.com",
    direccion: "Calle Jose Felix rivas, Barrio Sur N35",
    id: 2,
  },
];

app.get("/", (req, res) => {
  res.send("Node JS api");
});

app.get("/api/contacts", (req, res) => {
  res.send(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).send("Conacto no encontrado");
  else res.send(contact);
});

app.post("/api/contacts", (req, res) => {
  const contact = {
    id: uuidv4(),
    name: req.body.name,
    tlf: parseInt(req.body.tlf),
    email: req.body.email,
    direccion: req.body.direccion,
  };

  contacts.push(contact);
  res.send(contact);
});

app.delete("/api/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).send("Contacto no encontrado");
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  res.send(contact);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
