function [] = heatmap(bicycle)

% Normalize GPS coordinates from 0 to 1
x = normalize(bicycle.Longitude, 0.00000001, 1);
y = normalize(-bicycle.Latitude, 0.00000001, 1);

% Remove NaN rows
x = x(~any(isnan(x),2),:);
y = y(~any(isnan(y),2),:);

rows = 492;
columns = 825;

binaryImage = zeros(rows, columns);

for k = 1 : length(x);
	r = ceil(rows * y(k));
	c = ceil(columns * x(k));
	binaryImage(r, c) = 1;
end

imshow(binaryImage);

edm = imgaussfilt(binaryImage, 2);

imshow(edm, []);
colormap(hot(256));
colorbar;
hold on;

% imwrite(edm, 'heatmap.png');

end

function [normalized] = normalize(array, x, y)
% Normalizes data in array to range [x, y]

     % Normalize to [0, 1]:
     m = min(array);
     range = max(array) - m;
     array = (array - m) / range;

     % Then scale to [x,y]:
     range2 = y - x;
     normalized = (array*range2) + x;
end