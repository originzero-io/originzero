from flask import Flask, request, jsonify, render_template
from sympy import symbols, sympify, E, Limit, simplify, oo, zoo
from sympy.parsing.latex import parse_latex

app = Flask(__name__)

def get_symbols_from_latex(latex_eq, variable_values={}):
    parsed_expr = parse_latex(latex_eq)
    variable_names = {str(var) for var in parsed_expr.free_symbols if str(var).lower() != 'e'}
    symbols_dict = {var: variable_values.get(var, symbols(var)) for var in variable_names}

    return symbols_dict

def convert_latex_to_sympy(latex_eq, variable_values):
    symbols_dict = get_symbols_from_latex(latex_eq, variable_values)
    
    sympy_expr = parse_latex(latex_eq)
    
    for var, sym in symbols_dict.items():
        if var in variable_values and variable_values[var] != '':
            sympy_expr = sympy_expr.subs(parse_latex(var), sympify(variable_values[var]))
        else:
            sympy_expr = sympy_expr.subs(parse_latex(var), sym)
    
    sympy_expr = sympy_expr.subs(parse_latex('e'), E).subs(parse_latex('E'), E)
    
    return sympy_expr, symbols_dict

def get_variable_list(latex_code):
    symbols_dict = get_symbols_from_latex(latex_code)
    return list(symbols_dict.keys())



def calculate_result(sympy_expr, decimal_point=5):
    try:
        if isinstance(sympy_expr, Limit):
            sympy_expr = sympy_expr.doit()

        if sympy_expr.free_symbols:
            simplified_expr = simplify(sympy_expr)
            
            if not simplified_expr.free_symbols:
                result = simplified_expr.evalf()
                
                if result == oo or result == -oo or result == zoo:
                    raise ValueError("The result is divergent.")
                
                if result.is_number:
                    rounded_result = round(result, decimal_point) if not result.is_integer else int(result)
                    return {'result': rounded_result, 'error': None}
                
            return {'result': str(simplified_expr), 'error': None}
        
        else:
            result = sympy_expr.evalf()

            if result == oo or result == -oo or result == zoo:
                raise ValueError("The result is divergent.")
            
            if result.is_number:
                rounded_result = round(result, decimal_point) if not result.is_integer else int(result)
                return {'result': rounded_result, 'error': None}
            else:
                return {'result': str(result), 'error': None}
    
    except Exception as e:
        return {'result': None, 'error': str(e)}

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        latex_code = request.form['latex_code']
        variable_values = {var: request.form[var] for var in request.form if var != 'latex_code'}
        sympy_expression, _ = convert_latex_to_sympy(latex_code, variable_values)
        result = calculate_result(sympy_expression)
        return render_template('result.html', latex_code=latex_code, sympy_expression=sympy_expression, variable_values=variable_values, result=result)
    return render_template('index.html')

@app.route('/get_variables', methods=['POST'])
def get_variables():
    data = request.get_json()
    latex_code = data['latex_code']
    variable_list = get_variable_list(latex_code)
    return jsonify({'variable_list': variable_list})

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        latex_code = data['latex_code']
        variable_values = data.get('variables', {})
        options = data.get('options', {})
        decimal_point = options.get('decimal_point', 5)

        sympy_expression, _ = convert_latex_to_sympy(latex_code, variable_values)
        result = calculate_result(sympy_expression, decimal_point)

        return jsonify({'result': str(result['result']), 'error': str(result['error'])})

    except Exception as e:
        return jsonify({'result': None, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8006)