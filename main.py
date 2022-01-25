from app import app
import get_data

get_data.get_oxbuild_data()

app.run('0.0.0.0', 80)