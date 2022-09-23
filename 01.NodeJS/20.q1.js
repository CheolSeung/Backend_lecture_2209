// 인터파크 베스트셀러 제목 저자.. 등등 정보 가져오기

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://book.interpark.com/display/collectlist.do?_method=BestsellerHourNew201605&bestTp=1&dispNo=028&smid1=s_menu&smid2=bestseller';
axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);

        $('.listItem').each((index, element) => {
            let title = $(element).find('.itemName').text().trim();
            let author = $(element).find('.itemMeta').text().trim();
            let price = $(element).find('.priceWrap').text().trim();
            author = author.split(',').map(x => x.trim()).join(', ');
            console.log(index+1, '=================================')
            console.log(title);
            console.log(author);
            console.log(price);
        });
    })
    .catch(err => {
        console.log(err);
    });