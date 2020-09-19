// //Setting up Dropdown Menu
// d3.json("samples.json").then((data) => {
//     let ids = data.names;
//     d3.selectAll("#selDataset")
//     .selectAll("option")
//     .select('option')
//     .data(ids)
//     .enter()
//     .append("option")
//     .attr("value", function(d){
//         return d;
//     })
//     .text(function(d){
//         return d;
//     })
// }
// )
// //Setting up Event Handler (change plot on dropdown choice)
// function optionChanged() {
//     // d3.event.preventDefault();
//     let idlist = d3.select("#selDataset").node().value;
//     d3.select("#selDataset").node().value="";
//     buildPlot(idlist);
// }

//Bar Plot
function buildPlots(sampledata){
    var url = 
    d3.json("samples.json").then(function(databelly) {
        let name = databelly.name;
        let samples = databelly.samples[0].filter(sample => sample.id == sample);
        samples = samples[0];
        let topTen = samples.slice(0,10);
        topTen = topTen.reverse();
        let otu_id = topTen.otu_ids;
        let sample_values = topTen.sample_values;
        let otu_labels = topTen.otu_labels;

        let trace1 = {
            x: otu_id,
            y: sample_values,
            text: otu_labels,
            type: "bar"
        };
        let data = [trace1];
        
        let layout = {
            title: "Top Ten OTUs"
        };
        
    });
}


