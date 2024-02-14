import express from 'express';
import mongoose from 'mongoose';
import Visit from './models/Visit.js';
import Patient from './models/Patient.js';
import cors from 'cors';

mongoose
  .connect(
    'mongodb+srv://azigovali48:wwwwww123@cluster0.hgsi2e5.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('DB Ok');
  })
  .catch((err) => {
    console.log('DB Error', err);
  });

const app = express();
app.use(cors());

app.use(express.json());

app.get('/:date/:month', async (req, res) => {
  const { date, month } = req.params;
  try {
    const visits = await Visit.find({ date: date, month: month });
    if (visits.length === 0) {
      return res.status(403).json({ message: 'На сегодня пациентов нет, отдыхай:)' });
    }
    res.json(visits);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(403).json({ error: 'Internal Server Error' });
  }
});
app.get('/patients', async (req, res) => {
  try {
    const patient = await Patient.find();
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addVisit', async (req, res) => {
  try {
    const currentMonth = new Date().toLocaleDateString('ru-RU', { month: 'long' }).toLowerCase();
    const patient = await Patient.findOne({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
    });

    if (!patient) {
      return res.status(400).json({
        message: 'Пожалуйста, создайте или выберите пациента перед добавлением посещения.',
      });
    }
    const doc = new Visit({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      date: req.body.date,
      month: currentMonth,
      diagnosis: req.body.diagnosis,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      numberTooth: req.body.numberTooth,
    });

    const visit = await doc.save();

    res.json(visit);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось добавить пациента',
    });
  }
}),
  app.post('/addPatient', async (req, res) => {
    try {
      const newPatient = new Patient({
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
      });

      const savedPatient = await newPatient.save();

      res.json(savedPatient);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось добавить пациента',
      });
    }
  });

app.delete('/patients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByIdAndDelete(id);
    res.json(patient);
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка при удалении пациента',
    });
  }
});

app.delete('/visits/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const visit = await Visit.findByIdAndDelete(id);
    res.json(visit);
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка при удалении посещения',
    });
  }
});

app.patch('/changePatient/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patientChange = await Patient.findByIdAndUpdate(
      { _id: id },
      {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
      },
    );
    if (!patientChange) {
      return res.status(400).json({
        message: 'Пациент не найден',
      });
    } else {
      await Patient.findByIdAndUpdate(
        { _id: id },
        {
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
        },
      );
      res.json({ message: 'Пациент обновлен' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка при обновлении пациента',
    });
  }
});

app.get('/patient/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);
    res.json(patient);
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка при получении пациента',
    });
  }
});

app.patch('/changeVisit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Visit.findByIdAndUpdate(
      { _id: id },
      {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        diagnosis: req.body.diagnosis,
        arrivalTime: req.body.arrivalTime,
        price: req.body.price,
        numberTooth: req.body.numberTooth,
      },
    );
    res.json({ message: 'Посещение обновлено' });
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка при получении пациента',
    });
  }
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('SERVER OK');
});
