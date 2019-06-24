
--parse table from string

function ptstr(s)
	local data={}
	local wip=''
	for i=1,#s do
		r=sub(s,i,i)
		if(r==',') then
			add(data,wip+0)
			wip=''
		else
			wip=wip..r
		end
	end
	add(data,wip+0)
	return data
end

--polygon

function poly(r,c,p)
	local t=ptstr(r)
	--based off alienryderflex.com/polygon_fill
	--t=table x1,y1,x2,y2...
	--c=colors (hex)
	--p=pattern
	local pc=#t/2
	local px={}
	local py={}
	local my=127--miny
	local xy=0  --maxy
	--split out xy lookups
	for i=1,#t-1,2 do
		add(px,t[i])
		add(py,t[i+1])
		if(t[i+1]<my) my=t[i+1]
		if(t[i+1]>xy) xy=t[i+1]
		if(i<#t-2) then
			if(p) fillp(p)
			line(t[i],t[i+1],t[i+2],t[i+3],c)
			fillp()
			--yield()
		end
	end
	--scan down the screen
	for y=my,xy do
		local nx={}
		--build a list of nodes
 	local n=0
 	local j=pc
 	for i=1,pc do
 		if((py[i]<y and py[j]>=y)
 			or(py[j]<y and py[i]>=y)) then
 			add(nx,(px[i]+(y-py[i])/(py[j]-py[i])*(px[j]-px[i])))
 		end
 		j=i
 	end
 	--bubblesort nodes
 	local k=1
 	while(k<#nx) do
 		if(nx[k]>nx[k+1]) then
 			nx[k],nx[k+1]=nx[k+1],nx[k]
 			if(k>1) then
 				k-=1
 			end
 		else
 			k+=1
 		end
 	end
 	--fill the pixels
 	for l=1,#nx-1,2 do
 		local d=nx[l]
 		local e=nx[l+1]
 		if(d>=127) break
 		if(e>0) then
 			if(d<0) d=0
 			if(e>127) e=127
 			if(p) fillp(p)
 			line(d,y,e,y,c)
 			fillp()
 		end
 	end
 end
 --yield()
end

--polyline

function pline(r,c,p)
	local t=ptstr(r)
	for i=1,#t-2,2 do
		if(p) fillp(p)
		line(
			t[i],
			t[i+1],
			t[i+2],
			t[i+3],
			c
		)
		fillp()
	end
	--yield()
end