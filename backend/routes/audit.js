const express = require("express");
const axios = require("axios");

const analyzeHTML = require("../services/parser");

const router = express.Router();


router.post("/audit", async (req, res) => {

    const { url } = req.body;


    try {

        if (!url) {
            return res.status(400).json({
                error: "URL is required"
            });
        }


        const startTime = Date.now();


        const response = await axios.get(url, {
            timeout: 10000
        });


        const responseTime = Date.now() - startTime;


        const report = analyzeHTML(response.data);


        res.json({

            status: response.status,

            responseTime: `${responseTime} ms`,

            ...report

        });


    } catch (error) {


        res.status(500).json({

            error: "Unable to fetch website"

        });


    }

});


module.exports = router;