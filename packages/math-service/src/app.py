from flask import Flask, request, jsonify, render_template
from sympy import symbols, sympify, E
from sympy.parsing.latex import parse_latex

app = Flask(__name__)

def get_symbols_from_latex(latex_eq):
    parsed_expr = parse_latex(latex_eq)
    variable_names = parsed_expr.free_symbols
    symbols_dict = {str(var): symbols(str(var)) if str(var) != 'e' else E for var in variable_names}
    return symbols_dict

def convert_latex_to_sympy(latex_eq, variable_values):
    symbols_dict = get_symbols_from_latex(latex_eq)
    sympy_expr = parse_latex(latex_eq)
    for var, sym in symbols_dict.items():
        if var in variable_values and variable_values[var]:
            sympy_expr = sympy_expr.subs(parse_latex(var), sympify(variable_values[var]))
        else:
            sympy_expr = sympy_expr.subs(parse_latex(var), sym)
    return sympy_expr, symbols_dict

def get_variable_list(latex_code):
    symbols_dict = get_symbols_from_latex(latex_code)
    return list(symbols_dict.keys())

def calculate_result(sympy_expr, decimal_point=5):
    try:
        result = sympy_expr.evalf()
        rounded_result = round(result, decimal_point)
        
        if decimal_point == 0:
            formatted_result = int(rounded_result)
        else:
            formatted_result = rounded_result

        return formatted_result
    except Exception:
        result = sympy_expr.doit()
        return result
    

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        latex_code = request.form['latex_code']
        variable_values = {var: request.form[var] for var in request.form}
        sympy_expression, variable_list = convert_latex_to_sympy(latex_code, variable_values)
        result = calculate_result(sympy_expression)
        return render_template('result.html', latex_code=latex_code, sympy_expression=sympy_expression, variable_list=variable_list, result=result)
    return render_template('index.html')

@app.route('/get_variables', methods=['POST'])
def get_variables():
    data = request.get_json()
    latex_code = data['latex_code']
    variable_list = get_variable_list(latex_code)
    return jsonify({'variable_list': variable_list})

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    latex_code = data['latex_code']
    variable_values = data.get('variables', {})
    options = data.get('options', {})
    decimal_point = options.get('decimal_point', 5)
    
    sympy_expression, _ = convert_latex_to_sympy(latex_code, variable_values)
    result = calculate_result(sympy_expression, decimal_point)
    
    return jsonify({'result':str(result)})

if __name__ == '__main__':
    app.run(debug=True, port=8006)