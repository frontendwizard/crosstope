#!/bin/bash

# Specify the path to the CSV file
csv_file="../../prisma/dbo.sequence.csv"

# Read the CSV file line by line using cat
cat "$csv_file" | while IFS= read -r line; do
    # Remove leading/trailing double quotes and split the line into fields
    IFS=',' read -ra fields <<< "$(sed 's/^"\|"$//g' <<< "$line")"

    # Extract specific fields
    complex_code="${fields[3]}"
    mhc_allele="${fields[8]}"
    sequence="${fields[0]}"
    source_organism="${fields[10]}"

    # Remove quotes from the extracted fields
    complex_code="${complex_code//\"/}"
    mhc_allele="${mhc_allele//\"/}"
    sequence="${sequence//\"/}"
    source_organism="${source_organism//\"/}"

    # mv "$complex_code.pdb" to "$mhc_allele\_$sequence.pdb"
    echo "Renaming $complex_code.pdb to ${mhc_allele}_$sequence.pdb"
    mv "${complex_code}.pdb" "${mhc_allele}_$sequence.pdb"
done
