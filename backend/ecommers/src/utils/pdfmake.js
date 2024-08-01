const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');
const { table } = require('console');

// Construct absolute paths to font files
const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/font/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/font/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);



const exportpdfmake = () => {
    console.log(__dirname);
    const docDefinition = {
        content: [
            [
                {
                  image: './src/utils/Image/logo.jpg',
                  cover: {width: 150, height: 50, },
                //    alignment:"center"
                },
            ],
            { text: 'INVOICE', style: 'header', alignment:"center" },
            { 
                columns: [
                    {
                        width: '*',
                        text: [
                            { text: 'Name: ', bold: true }, 'Sian\n',
                            { text: 'Address: ', bold: true }, 'Surat\n',
                            { text: 'Email: ', bold: true }, 'Sian1785@gmail.com\n',
                            { text: 'Phone no: ', bold: true }, '2014789650\n'
                        ]
                    },
                   
                ]

            },
            { text: '\n' },
            {
                table: {
                    body: [
                        ['sr No', 'Items', 'Quantity','Price','Total Price'],
                        ['1', 'apple 15 pro', '1', '50000', '50000'],
                        ['2', 'cover', '2', '1000', '2000'],
                        [{  text: 'Total Amount', bold: true, colSpan: 4, alignment: 'center' }, {}, {}, {}, { text: '52000', bold: true }],
                       
                    ]

                },
                

            },
            // { text: '\n' },
            // { text: 'Sr no       Item              Quantity    Price   Total Price', style: 'subheader' },
            // {
            //     table: {
            //         body: [
            //             ['1', 'apple 15 pro', '1', '50000', '50000'],
            //             ['2', 'cover', '2', '1000', '2000']
            //         ]
            //     },
            //     layout: 'solid'
            // },
            // { text: '\nTotal Amount: 52000', style: 'subheader' } // Fixed the amount to match the total of items listed

        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10],
                // textalign: center,
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableOpacityExample: {
                margin: [0, 5, 0, 15],
                fillColor: 'blue',
                fillOpacity: 0.3
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },


        },
        defaultStyle: {
            // alignment: 'justify'
        },
        patterns: {
            stripe45d: {
                boundingBox: [1, 1, 4, 4],
                xStep: 3,
                yStep: 3,
                pattern: '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s'
            }
        }
    };

    // Construct the absolute path for the output PDF
    const outputPath = path.join(__dirname, '../../../../../Full stack project/backend/ecommers/document.pdf');

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
}

module.exports = exportpdfmake;