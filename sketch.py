class Investor(): # client side functions
	name = ""
	tokens = 0
	portfolio = dict()

	def addMoney(usd):
		tokens += usd

	def sell(Channel channel, int minPrice, int num):
		Market.postSell(this.name, channel, minPrice, num)

	def buy(Channel channel, int num):
		Market.postBuy(this.name, channel, askPrice, num)

	def takeMoney(tokenAmt):
		tokens -= tokenAmt
		return tokenAmt

class Channel():
	marketCap = 0
	shares = 0
	shareValue = marketCap/sharesTotal

	def startChannel(int shareAmt):
		shares = shareAmt

class Market(): # this is the server
	sell = {} # {channel:[[seller, askPrice, num],[seller2, askPrice2, num2]]}
	buy = {} # {channel:[[buyer, askPrice, num],[buyer2, askPrice2, num2]]}

	def postSell(Investor seller, Channel channel, int minPrice, int num):
		for i in buy[channel]:
			if minPrice < buy[channel][i][1]:
				sell[channel][i][0].portfolio[channel] -= sell[channel][i][2]
				seller.portfolio[channel] -= 
				# remove the number of shares to be sold from the sellers portfolio
				buyer.portfolio[channel] -= sell[channel][i][2]
				# add the number of shares to be bought to the buyers portfolio
				return "Succesful sale"
		sell[channel].append([seller, minPrice, num])

	def postBuy(Investor buyer, Channel channel, int askPrice, int num):
		for i in sell[channel]:
			if askPrice > sell[channel][i][1]:
				sell[channel][i][0].portfolio[channel] -= sell[channel][i][2]
				# remove the number of shares to be sold from the sellers portfolio
				buyer.portfolio[channel] += sell[channel][i][2]
				# add the number of shares to be bought to the buyers portfolio
				return "Succesful purchase"
		buy[channel].append([buyer, askPrice, num])
		# if no sell that meets criteria is found, post to buy dict