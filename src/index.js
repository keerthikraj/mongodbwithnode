const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://keerthikmca05:9ika5XEGijQWS3xN@cluster0.ighxidg.mongodb.net/keerthik?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
    { useNewUrlParser: true, 
      useUnifiedTopology: true
    });


async function main() {
    try {
        await client.connect();
        await listDatabases(client);

        await createListing(client,{
            name:"keerthik",
            age:24,
            city:"karur",
            country:"india"
        });

        await findByid(client,"keerthik")

        await updateListingbyId(client,"keerthik",{city:"chennai",country:"southafrica"});

        await deleteListingByName(client,"k")
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);
//List Document..
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//post Document..
async function createListing(client,newListing){
    const result= await client.db("keerthik").collection("crud").insertOne(newListing);
    console.log(`create id is - ${result.insertedId}`)
}

//Read Document..
async function findByid (client,name){
    const result= await client.db("keerthik").collection("crud").findOne({name});
    if(result){
        console.log(name)
        console.log(result)
    }else{
        console.log(`no listing found in -${name}`)
    }
}   

// Update Document..
async function updateListingbyId(client,name,updateListing){
    const result=await client.db("keerthik").collection("crud").updateOne({name},{$set: updateListing});
    console.log(`${result.matchedCount}`)
    console.log(`${result.modifiedCount}`)
}

//Delete Document..
async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("student").collection("students")
            .deleteOne({ first_name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}