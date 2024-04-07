from flask import Flask, request, jsonify
import os
import psycopg2
from flask_cors import CORS, cross_origin
import mysql.connector
from datetime import datetime
import xarray as xa
import json


app = Flask(__name__)

# conn = mysql.connector.connect(
#     host='localhost',    # Change this to your MySQL host
#     user='root',     # Change this to your MySQL username
#     password='', # Change this to your MySQL password
#     database='hack24' # Change this to your MySQL database name
# )


#CORS(app, origins="*")
cors = CORS(app, resources={r'*':{'origins': '*'}})

# Define a custom CORS handler function
# def handle_cors(response):
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Headers', '*')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#     return response

# # Register the CORS handler function as a decorator for all routes
# @app.after_request
#     def after_request(response):
#      return handle_cors(response)

conn = psycopg2.connect(database="finito_hk",  
                        user="lukas_k", 
                        password="patrik_timko",  
                        host="10.0.2.153", port="5432") 


@app.route('/')
def hello():
    cur = conn.cursor()
    cur.execute('''SELECT * FROM area''')

    data = cur.fetchall() 

    print(data)
    cur.close()
    return 'Hello, World!'


@app.route('/api/event', methods=["POST", "GET"])
def manage_event():
    cur = conn.cursor()
    if request.method == 'POST':  
        data = request.json
        print(data)
        query = """INSERT INTO incident (name, description, point_id) VALUES (%s, %s, %s)"""
        params = (data["name"], data["desc"], data["point_id"])
        cur.execute(query, params)
        conn.commit()
        cur.close()
        return {"status":"event added"}
    else:
        model = str(request.args.get('model'))
        time = str(request.args.get('time'))
        #print(int(time)+20, type(time))
        #years = 157680000
        #print(type(model), model)

        #print(f"{time} {max} {min}")
        query = '''SELECT i.name, description, p.name, p.x, p.y, model.incident_date, i.id FROM model 
                JOIN incident i on i.id = model.incident_id
                JOIN point p on p.id = i.point_id
                WHERE spp_model = (%s)
                '''
        params = (model,)
        cur.execute(query, params)
        data = cur.fetchall() 
        #data = []
        #print(data)
        datetime_obj = datetime.fromtimestamp(float(time))

        max = float(datetime_obj.year) + 10
        min = float(datetime_obj.year) - 10
        final_data = []

        for one_data in data:
            #print(one_data[5].year, min, max)
            if( int(one_data[5].year) > min and int(one_data[5].year) < max):
                #print("vosiel som ")
                final_data.append({"event_name":one_data[0], "desc":one_data[1], "point_name":one_data[2], "x":one_data[3], "y":one_data[4], "date": one_data[5], "event_id": one_data[6]})
            
        #print(f"Final data: {final_data}")
            
        # cur.close()
        return jsonify(final_data)
    
@app.route('/api/avrg_temps', methods=["GET"])
def get_average_temperatures():
    cur = conn.cursor()
    #area_id = str(request.args.get("area_id"))
    model = str(request.args.get('model'))
    year = int(request.args.get('year'))

    if year < 2015:
        year = 2015
    str(year)

    query = '''
        select area_id, temp from avg_temp where ssp_model = (%s) AND year = (%s);
    '''
    params = (model, year)
    cur.execute(query, params)
    data = cur.fetchall()
    final_data = []

    for one_data in data:
        final_data.append({"area_id":one_data[0], "temp":one_data[1]})

    #print(data)
    cur.close()
    return jsonify(final_data)  

@app.route('/api/area-events', methods=["GET"])
def get_event_in_area():
    cur = conn.cursor()
    area_id = str(request.args.get("area_id"))
    query = '''
        select i.name, i.description, i.id, m.incident_date, m.spp_model from area a
        join point p on a.id = p.area_id
        join incident i on p.id = i.point_id
        join model m on i.id = m.incident_id
        where a.id = %s;
    '''

    params = (area_id,)
    cur.execute(query, params)
    data = cur.fetchall() 
    #print(data)

    
    final_data = []

    for one_data in data:
        final_data.append({"event_name":one_data[0], "desc":one_data[1], "event_id": one_data[2], "date": one_data[3], "model": one_data[4]})
        
    #print(f"Final data: {final_data}")
        
    cur.close()
    return jsonify(final_data)



@app.route('/api/events', methods=["GET"]) 
def get_events():
    cur = conn.cursor()
    if request.method == 'GET':  
        #query = '''SELECT * FROM incident'''
        cur.execute('''SELECT * FROM incident''')
        data = cur.fetchall() 
        #data = {"status":"got"}
        new_data = []
        for one_data in data:
            if len(one_data) >= 4:
                temp = {"id":one_data[0], "name":one_data[1], "desc":one_data[2], "point_id":one_data[3]}
                new_data.append(temp)
            else:
                {"status":"error"}
        cur.close()
        return jsonify(new_data)


@app.route('/api/model', methods=["POST"])
def add_model():
    cur = conn.cursor()
    if request.method == 'POST':  
        data = request.json
        print(f"InDt{data["incident_date"]}, {data["incident_id"]} {data["spp_model"]}")
        query = """INSERT INTO model (incident_date, incident_id, spp_model) VALUES (TO_TIMESTAMP(%s), %s, %s)"""
        params = (data["incident_date"], data["incident_id"], data["spp_model"])
        cur.execute(query, params)
        conn.commit()
        cur.close()
        return {"status":"event added"}

@app.route('/api/add_area', methods=["GET"])
def add_manual():
    cur = conn.cursor()
    if request.method == 'GET':
        #print(data)
        names = ["Usa","Canada","Middle Amerika", "Brazil","Bolivia", "Argentina", "Middle Europe", "North Europe", "South Europe", "West Europe", "Middle Africa", "East Africa","North Africa", "South Africa", "West Africa", "China", "India", "Russia", "Indonesia", "Arabia", "Australia", "New Zeland"]
        area_ids = [4,4,4,5,5,5,3,3,3,3,1,1,1,1,1,2,2,2,2,2,6,6]
        for i in range(0,22):
            pass
            # query = """INSERT INTO area (id, name, continent_id) VALUES (%s, %s, %s)"""
            # params = (i+1, names[i], area_ids[i])
            # cur.execute(query, params)
            # conn.commit()
        
        cur.close()
        return {"status":"area added"}


@app.route('/api/area', methods=["POST", "GET"])
def manage_area():
    cur = conn.cursor()
    if request.method == 'POST':
        data = request.json
        #print(data)
        query = """INSERT INTO area (name, continent_id) VALUES (%s, %s)"""
        params = (data["name"], data["area_id"])
        cur.execute(query, params)
        conn.commit()
        cur.close()
        return {"status":"area added"}
    else:
        cur.execute('''SELECT * FROM area WHERE id>0''')
        data = cur.fetchall()
        #print(data)
        new_data = []
        for one_data in data:
            if len(one_data) >=3:
                temp = {"id":one_data[0], "name":one_data[1], "continent_id":one_data[2]}
                new_data.append(temp)
            else:
                cur.close()
                return {"status":"error"}
        
        #print(new_data)
        #data = {"status":"sent"}
        cur.close()
        return jsonify(new_data)
    
@app.route('/api/area_details', methods=['GET', 'POST'])
def get_area_details():
    if request.method == 'POST':
        #dostanem desc, model, id, area_id, time
        data = request.json
        #print(data)
        query = """INSERT INTO area_detail (description, ssp_model, time_period, area_id) VALUES (%s, %s, TO_TIMESTAMP(%s), %s)"""
        params = (data["desc"], data["ssp_model"], data["time"], data["area_id"])
        cur.execute(query, params)
        conn.commit()
        cur.close()
        return {"status":"area details added"}

    else:
        cur = conn.cursor()
        area_id = request.args.get("area_id")
        query = '''
            SELECT name, description, ssp_model, time_period FROM area
            LEFT JOIN area_detail ON area.id = area_detail.area_id WHERE area.id = %s'''
        params = (area_id,)
        cur.execute(query, params)
        data = cur.fetchall()
        new_data = []
        for one_data in data:
            temp = {"area_name": one_data[0], "desc": one_data[1], "ssp_model": one_data[2], "date": one_data[3]}
            new_data.append(temp)
        cur.close()
        return jsonify(new_data)

@app.route('/api/point', methods=["POST", "GET"])
def manage_point():
    cur = conn.cursor()
    if request.method == 'POST':
        data = request.json
        query = """INSERT INTO point (name,x,y, area_id) VALUES (%s, %s, %s, %s)"""
        params = (data["name"], data["x"], data["y"], data["area_id"])
        cur.execute(query, params)
        cur.close()
        conn.commit()

        return {"status":"added_point"}
    else:
        data = int(request.args.get('area_id'))  #id regiona v ktorom sa pointy nachadzaju
        #print(type(data))
        query = """SELECT * FROM point WHERE area_id = %s"""
        params = (data,)
        #print(params, type(params))
        cur.execute(query, params)
        data = cur.fetchall()
        
        #data = {"status":"sending all points"}
        cur.close()
        return {"status":"sending all points"}

@app.route('/api/points', methods=["POST", "GET"])
def get_points():
    cur = conn.cursor()
    if request.method == 'GET':
        #query = """SELECT * FROM point"""
        cur.execute('''SELECT * FROM point WHERE id>0''')
        data = cur.fetchall()
            
        print(data)
        new_data = []
        for one_data in data:
            if len(one_data) >= 5:
                temp = {"id": one_data[0], "name": one_data[1], "x": one_data[2], "y": one_data[3], "area_id": one_data[4]}
                new_data.append(temp)
            else:
                cur.close()
                return {"status":"error"}
        
        #print(new_data)
        #data = {"status":"sending all points"}
        cur.close()
        return jsonify(new_data)

@app.route('/login', methods=["POST", "GET"])
def login():
    cur = conn.cursor()
    if request. method == 'POST':
        data = request.json
        query = """INSERT INTO point (name, area_id) VALUES (%s, %s)"""
        params = (data["name"], data["area_id"])
        cur.execute(query, params)
        conn.commit()
        cur.close()
        return {"status":"added_point"}
    else:
        args = request.args #id regiona v ktorom sa pointy nachadzaju
        query = """SELECT * FROM point WHERE area_id = %s"""
        params = (data["area_id"])
        cur.execute(query, params)
        data = cur.fetchall()
        
        #data = {"status":"sending all points"}
        cur.close()
        return data 

@app.route('/api/data-manage', methods=["GET"])
def data_manage():
    
    if request.method == 'GET':
        cur = conn.cursor()
        #ssp_model = "ssp1"
        k = 0.04
        first_temp = 24.6
        s_model = "SSP1-2.6"
        area_id = 8
        #file_path = "./venv/Include/west_eu/Paris_"+ssp_model+".json"
        
        # Open the JSON file for reading
        # with open(file_path, "r") as json_file:
        #     data = json.load(json_file)

        #x = round(data["coverages"][0]["domain"]["axes"]["x"]["values"][0],5)
        #y = round(data["coverages"][0]["domain"]["axes"]["y"]["values"][0],5)
        #temperatures = []
        # for one_year in data["coverages"]:
        #     #print(one_year["domain"]["axes"]["t"]["values"][0])
        #     month = one_year["domain"]["axes"]["t"]["values"][0][5:7]
        #     year = one_year["domain"]["axes"]["t"]["values"][0][:4]
        #     temp = round(one_year["ranges"]["temperature_stat:avg"]["values"][0]-273.15,3)
        #     if(month == '03'):
        #         query = """INSERT INTO avg_temp (year, temp, ssp_model ,area_id) VALUES (%s, %s, %s, %s)"""
        #         params = (year, temp, s_model ,area_id)
        #         cur.execute(query, params)
        #         conn.commit()
        #         print(f"Added: Y:{year}, T:{temp}, A:{area_id}")
                
                #temperatures.append({"year":year, "temp":round(temp, 2)})
        
        for year in range(1980,2081):
            temp = first_temp + k
            first_temp = first_temp + k

            query = """INSERT INTO avg_temp (year, temp, ssp_model ,area_id) VALUES (%s, %s, %s, %s)"""
            params = (year, temp, s_model ,area_id)
            cur.execute(query, params)
            conn.commit()
            print(f"Added: Y:{year}, T:{temp}, A:{area_id}")

        #print(f"Coord: x:{x} y:{y}")
        # print(temperatures)
        cur.close()
        return {"status":"added"}
    else:
        return {"status":"I am going to kill myself"}



if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
