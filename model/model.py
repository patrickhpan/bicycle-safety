import csv

MIN_LAT = 42.3534
MAX_LAT = 42.4026
MIN_LONG = -71.1579
MAX_LONG = -71.0754

def parseCSV():

    with open('heatmap.csv', 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',', quotechar='|')

        num_cols = len(csvreader.next())

        matrix = [[row[col] for col in xrange(num_cols)] for row in csvreader]

        num_rows = len(matrix)

    return matrix, num_rows, num_cols

matrix, num_rows, num_cols = parseCSV()

def GPStoScalar(latitude, longitude):
    if latitude < MIN_LAT or latitude > MAX_LONG or longitude < MIN_LONG or longitude > MAX_LONG:
        return None

    
