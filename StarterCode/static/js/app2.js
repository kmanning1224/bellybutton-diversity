//Setup dropdown meny
function idlist() {
        //load in json file
    d3.json("static/js/samples.json").then(id => {
        let names = id.names
        let drop_menu = d3.select("#selDataset");
        //Pull ID into dropdown, place property into value.
        names.forEach(function(names_id) {
            drop_menu.append("option").text(names_id).property("value");
            //start with plots and starting id panel

        })
    })
};


    //Create Metadata Panel
function optionChanged(){
        //load json file
    d3.json("static/js/samples.json").then((meta_data => {
        let id_drop = d3.select("#selDataset").node().value;
        let metadata = meta_data.metadata;
        let meta_id = metadata.filter(i => i.id.toString() === id_drop)[0];
            // Select elements and make sure they are clear
        let metapanel = d3.select("#sample-metadata");
        metapanel.html("")
            //Pull "Key"/ID from dropdown and push information on ID from metadata
        Object.entries(meta_id).forEach(([key, value]) => {
            let panel = metapanel.append("h5");
            panel.text(key + ":" + "       " + value);
                
        })
    }))
    };

//Start bulding Plots
function plotbar() {
    d3.json("static/js/samples.json").then(samplesjson => {
        //Set ID Var to Metadata table, pulling the information from there
        //Set variables for bar
        let idvar = d3.select("#selDataset").node().value;
        let idselect = samplesjson.samples.filter(i => i.id == idvar)[0];
        let sample_values = idselect.sample_values.slice(0,10).reverse();
        let otu_labels = idselect.otu_labels.slice(0,10);
        let top_ten_otu = idselect.otu_ids.slice(0,10).reverse();
        let top_ten_id = top_ten_otu.map(i => "OTU ID :" + i);
        //Set variable for bubble plot
        let sample_val_bubble = idselect.sample_values;
        let otu_id_bubble = idselect.otu_ids;
        //Begin Bar Plot dict 
        let bartrace = {
            x: sample_values,
            y: top_ten_id,
            text: otu_labels,
            type: "bar",
            orientation:"h"
        };
        
        //Store Bar data
        let bardata = [bartrace];

        //Create Bar Plot layout
        let barlayout = {
            title: `Top Ten OTUs for ID`,
            margin: {
                l:150,
                r:25,
                t:50,
                b:50
            }
        };
        //Create Plots
        Plotly.newPlot("bar", bardata, barlayout);

        //Begin Bubble Plot dict
        let bubbledata = {
            x:otu_id_bubble,
            y:sample_val_bubble,
            mode: "markers",
            marker: {
                size: sample_val_bubble,
                color: otu_id_bubble
            },
            text: otu_labels
        }
        let bubble_data = [bubbledata];
        //Begin Bubble Plot dict
        let bubblelayout = {
            title: `Bacteria types found for ID: ${idselect}`
        }

        //Create Plots
        Plotly.newPlot("bubble", bubble_data, bubblelayout )
    }

    )};

    ////Create function to update Plots/Panel with id change

   //first function to run dropdown list
    idlist();
    //Create function to start page with first ID on dropdown
    function firstSample() {
        let startingsample = d3.select("#selDataset").node().value;
        plotbar(startingsample)
        optionChanged(startingsample)    
    };
    //Create function to run plots/metapanel on dropdown list change
    function changedSample(data) {
        return d3.select('#selDataset').on("change", plotbar, optionChanged)
    };
    //run function
    firstSample();
    changedSample();
