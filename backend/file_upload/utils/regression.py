import pandas as pd
import statsmodels.api as sm

def regression(df, y, x):
    independent = df[x]
    dependent = df[y]

    independent = sm.add_constant(independent, has_constant='add')
    model = sm.OLS(dependent, independent)
    results = model.fit()

    regression_summary = {
        "coefficient_names": results.params.index.to_list(),
        "coefficient_values": results.params.to_list(),
        "p_values": results.pvalues.to_list(),
        "r_squared": results.rsquared,
        "adj_r_squared": results.rsquared_adj,
    }

    return regression_summary