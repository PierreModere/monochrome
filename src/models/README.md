# 3D MODELS

By placing your model here (.glb, .gltf or .fbx), it will be automatically imported in your project.
The name of your file will be used to name the variable that will contains your model.

Example:
Take a look at `js/World/Samothrace.js`:
With a file `./Samothrace.glb`, you can access your model with `this.models.Samothrace`

You can also organize your models with different directories.
For example, `./models/any/path/to/Samothrace.glb` find its access with `this.models.any.path.to.Samothrace`