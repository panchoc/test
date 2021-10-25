var apiProvider = require("./provider/api");
const mssql = require("mssql");
const cfg = require("./config");

module.exports = {
    initDB: async () => {
        let check = await checkBD()
         if(! check){

      
            console.log('Llenando BD');
            let data = await apiProvider.getCharacters();
            let pool = await mssql.connect(cfg.sql)

            let books = [... new Set(data.book.map(elem => elem.books).flat(1))];
            let titles = [... new Set(data.book.map(elem => elem.titles).flat(1))]

            try {
                let deleteBook = await pool.request()
                    .query(`DELETE FROM Book
                    DBCC CHECKIDENT ('Book', RESEED, 0)`)
                // console.log(deleteBook)
                books.forEach(async elem => {
                    let query = await pool.request()
                        .input('name', mssql.VarChar, elem)
                        .execute('insertBook')
                })
            } catch (error) {
                console.log('error sp insert book', error)
            } finally {
                console.log('libros listos')
            }
          
            try {
                let deletTitle = await pool.request()
                    .query(`DELETE FROM Title_
                DBCC CHECKIDENT ('Title_', RESEED, 0)`)

                titles.forEach(async elem => {
                    let query = await pool.request()
                        .input('name', mssql.VarChar, elem)
                        .execute('insertTitle')
                })
            } catch (error) {
                console.log('error insert titles :>> ', error);
            } finally {
                console.log('titulos listos')
            }
            
            try {
                let deleteChar = await pool.request()
                .query(`DELETE FROM Character
                    DELETE FROM character_book
                    DELETE FROM character_title
                DBCC CHECKIDENT ('Character', RESEED, 0)`);

                for (let index = 0; index < data.book.length; index++) {
                    const elem = data.book[index];
                    let charID = await pool.request()
                    .input('name', mssql.VarChar, elem.name)
                    .input('gender', mssql.VarChar, elem.gender)
                    .input('culture', mssql.VarChar, elem.culture)
                    .input('slug', mssql.VarChar, elem.slug)
                    .input('image', mssql.VarChar, elem.image)
                    .input('house', mssql.VarChar, elem.house)
                    .input('alive', mssql.Bit, elem.alive)
                    .input('rank', mssql.Int, elem.pagerank.rank)
                    .execute('insertCharacter') 
                

    

                   for (let index = 0; index < elem.books.length; index++) {
                       const book = elem.books[index];
                       let query = await pool.request()
                                .input('idChar', mssql.Int, charID.recordset[0].id)
                                .input('bookName', mssql.VarChar, book)
                                .execute('insertCharBook')
                   }
                       
                   
                        for (let index = 0; index < elem.titles.length; index++) {
                            const title = elem.titles[index];
                            let query = await pool.request()
                                    .input('idChar', mssql.Int, charID.recordset[0].id)
                                    .input('titleName', mssql.VarChar, title)
                                    .execute('insertCharTitle')
                        }

                      
              }  
            } catch (error) {
                console.log('error char', error)
            }finally{
                console.log('personajes listos')
            }

        pool.close()
    }else {
        console.log('BD lista')
    }
    }

   
};

var checkBD = async ()=>{
    let pool = await mssql.connect(cfg.sql)
    let query = await pool.request()
        .query('SELECT TOP (1) 1 FROM Character')
      //  console.log(query.recordset)
    let result = query.recordset.length >0 ? true : false
    return result
}