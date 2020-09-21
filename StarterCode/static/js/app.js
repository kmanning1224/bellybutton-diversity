
 
    //setup dropdown menu
    function dropdown() {
        let drop_menu = d3.select("#selDataset");
        //load in json file again
        d3.json("static/js/samples.json").then((finaldata) =>
        {
            // console.log(finaldata)
            finaldata.names.forEach(function(name_id) {
                drop_menu.append("option").text(name_id).property("value");
            });
            //display data based off selection
            let startingsample = finaldata.names[0];
            plottingbar(startingsample);
            plottinggauge(startingsample);
            meta_table(startingsample);
        }
        )};
            //create function so optionchanged works w/ html
    function optionChanged(newdata) {
        plottingbar(newdata);
        plottinggauge(newdata);
        meta_table(newdata);
    }
        

//Set up Metadata Table
    //pull json file in again
    function meta_table(data) {
        d3.json("static/js/samples.json").then((meta_data) => {
            //create array
            let metadata = meta_data.metadata
            let metaid = metadata.filter(i => i.id.toString() === data)[0];
            let metatable = d3.select("#sample-metadata");
            metatable.html("");
    ////Tried to re use code from previous javascript assignment, didnt work.
            // metaid.forEach(function(metainfo) {
            //     console.log(metaid)
            //     let row = metatable.append("h5")
                Object.entries(metaid).forEach(([key, value]) => {
                    let cell = metatable.append("h5");
                    cell.text(key + ":" + "    " + value);
                
                });
            
            });
    };

//create Plots

    //load json file again
    function plottingbar(data){

        d3.json("static/js/samples.json").then(sample_array => {
            //Bar Plots only req top ten
            let sample_values = sample_array.samples[0].sample_values.slice(0,10).reverse();
            let otu_labels = sample_array.samples[0].otu_labels.slice(0,10);
            let top_ten_otu = sample_array.samples[0].otu_ids.slice(0,10).reverse();
            let top_ten_id = top_ten_otu.map(i => "OTU ID : " + i);
            let wfreq = sample_array.metadata[0].wfreq;
            
            //build trace for barplot
            let trace1 = {
                x: sample_values,
                y: top_ten_id,
                text: otu_labels,
                type: "bar",
                orientation: "h"
                };
    
                //create bar plot data dict
                let bar_data = [trace1];
    
                //create layout
                let bar_layout = {
                    title: "Top Ten OTUs",
                    margin: {
                        l:150,
                        r:25,
                        t:50,
                        b:50
                    }
                }
                //Build Plot w/ Plotly
            Plotly.newPlot("bar", bar_data, bar_layout)
     
      
            let trace2 = {
                x:sample_array.samples[0].otu_ids,
                y:sample_array.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sample_array.samples[0].sample_values,
                    color:sample_array.samples[0].otu_ids
                },
                text: sample_array.samples[0].otu_labels
            };
            let bubble_data = [trace2];
            let bubble_layout = {
                title: "OTUs"
            }
            Plotly.newPlot("bubble", bubble_data, bubble_layout)
    
        });
    }
        function plottinggauge(data){
            let trace3 = [
                {
                    
                    value: [1-2][2-3],
                    title: { text: "Washing Frequency" },
                    type: "indicator",
                    mode: "gauge"
                }
            ];
              
              var layout = {
                width: 500,
                height: 400,
                margin: { t: 25, r: 25, l: 25, b: 25 },
                paper_bgcolor: "lavender",
                font: { color: "darkblue", family: "Arial" }
              };
              
              Plotly.newPlot('gauge', trace3, layout);
              
            };
  
    dropdown();