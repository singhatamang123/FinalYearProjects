from PIL import Image, ImageFilter


img = Image.open('208_astro.jpg')
# filtered_img = img.filter(ImageFilter.SHARPEN)

# filtered_img = img.convert('L')

# # filtered_img.rotate(90).show()

# # resize = filtered_img.resize((300, 300))

# box = (100, 100, 400, 400)

# region = filtered_img.crop(box)
# filtered_img.save("crop.png", 'png')
# # print(dir(img.mode))
# # filtered_img.show()

# print(img.size)

"""
Another one 
"""
img.thumbnail((400, 200))
img.save('thumbnail.jpg')



