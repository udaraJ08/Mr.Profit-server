const express = require('express');
const router = express.Router();

//requiring models
const expences = require('../DB/Expences');

////////////////////////////////////
////////Get Requests////////////////
////////////////////////////////////

router.post("/find/bytime", async (req, res) => {

    const exp = req.body;

    await expences.findOne({
        time: {
            year: exp.time.year,
            month: exp.time.month
        },
        "userID": exp.userID,
    }).then(data => {
        if (data)
            res.send(data);
        else res.send(false);
    }).catch(err => {
        if (err)
            res.send(err.message());
    })
})

////////////////////////////////////
////////POST Requests////////////////
////////////////////////////////////

router.post('/add', async (req, res) => {

    const exp = req.body;

    let expAmount = 0

    for (const [key, value] of Object.entries(exp.expences)) {
        expAmount += value
    }

    const template = {
        "userID": exp.userID,
        "time": {
            "year": exp.year,
            "month": exp.month
        },
        "income": exp.income,
        "expences": exp.expences,
        "expencesAmount": expAmount,
        "profit": (exp.income - expAmount)
    }

    await expences.create(template).then(data => {
        res.send(data)
    }).catch(err => {
        if (err)
            res.send(err)
    })
})

router.post("/add/expence-item", async (req, res) => {

    const exp = req.body;

    let expAmount = 0;

    const data = await expences.findOne({
        "userID": exp.userID,
        "time": {
            "year": exp.year,
            "month": exp.month
        }
    })

    if (data) {
        for (const [key, value] of Object.entries(exp.items)) {

            if (Object.entries(data.expences).length !== 0) {
                for (const [orKey, orValue] of Object.entries(data.expences)) {

                    if (orKey == key) {
                        const expOrAmount = orValue + value
                        data.expences[orKey] = expOrAmount
                        break;
                    } else {
                        data.expences[key] = value
                    }
                }
            } else {
                data.expences[key] = value
            }
            expAmount += value
        }
    }

    data.expencesAmount += expAmount

    data.profit = data.income - data.expencesAmount

    const newData = await expences.findOneAndUpdate({ "userID": exp.userID }, data, {
        useFindAndModify: false,
        new: true
    })

    res.send(newData)
})

router.post("/delete/expences/item", async (req, res) => {

    const exp = req.body

    const data = await expences.findOne({ _id: exp._id }).
        catch(err => {
            res.send(err.message)
        })

    let expAmount = 0;

    if (data) {
        for (const [key, value] of Object.entries(data.expences)) {
            if (key == exp.item) {
                expAmount = value
                delete data.expences[key]
                break;
            }
        }

        if (Object.keys(data.expences).length === 0) {
            console.log(data);
        }
        data.expencesAmount -= expAmount
        data.profit += expAmount
    }

    expences.findOneAndUpdate({ _id: exp._id }, data, {
        useFindAndModify: false,
        new: true
    }).then(data => {
        res.send(data)
    }).catch(err => {
        if (err)
            res.send(err.message)
    })
})


router.post("/expences/sum/item", async (req, res) => {

    const exp = req.body

    const data = await expences.findOne({ _id: exp._id }).
        catch(err => {
            res.send(err.message)
        })

    if (data) {
        for (const [key, value] of Object.entries(exp.item)) {

            for (const [orKey, orValue] of Object.entries(data.expences)) {

                if (key === orKey) {
                    data.expencesAmount += value
                    data.expences[key] += value
                    data.profit -= value
                    break
                }
            }
        }
    } else res.send("No data found !!!")

    res.send(data)

    expences.findOneAndUpdate({ _id: exp._id }, data, {
        useFindAndModify: true,
        new: true
    }).then(data => res.send(data)).catch(err => {
        if (err)
            res.send(err.message)
    })
})

router.post("/expences/diff/item", async (req, res) => {

    const exp = req.body

    const data = await expences.findOne({ _id: exp._id }).
        catch(err => {
            res.send(err.message)
        })

    let expAmount = 0

    if (data) {
        for (const [key, value] of Object.entries(exp.item)) {

            for (const [orKey, orValue] of Object.entries(data.expences)) {

                if (key === orKey) {
                    expAmount = value
                    data.expences[key] -= value
                    data.profit += value
                    break
                }
            }
        }
        data.expencesAmount -= expAmount
    } else res.send("No data found !!!")

    expences.findOneAndUpdate({ _id: exp._id }, data, {
        useFindAndModify: true,
        new: true
    }).then(data => res.send(data)).catch(err => {
        if (err)
            res.send(err.message)
    })
})
////////////////////////////////////
////////PUT Requests////////////////
////////////////////////////////////

////////////////////////////////////
////////DELETE Requests/////////////
////////////////////////////////////
router.delete("/delete/expences/:id", async (req, res) => {

    expences.remove({ _id: "60daeb679cdcaa297c7baca5" }).then(data => {
        res.send(data)
    }).catch(err => {
        if (err) res.send(err)
    })
})

module.exports = router