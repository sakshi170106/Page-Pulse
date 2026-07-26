function analyzeHTML(html) {

    const cheerio = require("cheerio");

    const $ = cheerio.load(html);


    const title = $("title").text();


    const metaDescription =
        $('meta[name="description"]').attr("content") || "";


    const h1Count = $("h1").length;


    let missingAltImages = 0;

    $("img").each((index, element) => {

        const alt = $(element).attr("alt");

        if (!alt) {
            missingAltImages++;
        }

    });


    const text = $("body").text();

    const wordCount = text
        .trim()
        .split(/\s+/).length;


    return {
        title,
        metaDescription,
        h1Count,
        missingAltImages,
        wordCount
    };
}


module.exports = analyzeHTML;